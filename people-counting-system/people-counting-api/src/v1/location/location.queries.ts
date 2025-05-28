import { executeQuery } from '../../db';
import { Location } from '../../interface';

export async function insertLocation(data: { name: string; address: string }): Promise<Location> {
  const query = `
    INSERT INTO "location" ("name", "address")
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await executeQuery(query, [data.name, data.address]);
  return result[0] as Location;
}

export async function getAllLocations(): Promise<Location[]> {
  const query = `SELECT * FROM "location" WHERE "deleted" IS NULL ORDER BY "id" ASC;`;
  return await executeQuery(query, []);
}

export async function getLocationById(id: number): Promise<Location | null> {
  const query = `SELECT * FROM "location" WHERE "id" = $1 AND "deleted" IS NULL;`;
  const result = await executeQuery(query, [id]);
  return result[0] ?? null;
}

export async function updateLocation(
  id: number,
  data: { name?: string; address?: string }
): Promise<Location | null> {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.name !== undefined) {
    fields.push(`"name" = $${idx++}`);
    values.push(data.name);
  }
  if (data.address !== undefined) {
    fields.push(`"address" = $${idx++}`);
    values.push(data.address);
  }
  if (fields.length === 0) return null;

  const query = `
    UPDATE "location"
    SET ${fields.join(', ')}, "updated" = NOW()
    WHERE "id" = $${idx} AND "deleted" IS NULL
    RETURNING *;
  `;
  values.push(id);
  const result = await executeQuery(query, values);
  return result[0] ?? null;
}

export async function deleteLocation(id: number): Promise<boolean> {
  const query = `
    UPDATE "location"
    SET "deleted" = NOW()
    WHERE "id" = $1 AND "deleted" IS NULL
    RETURNING *;
  `;
  const result = await executeQuery(query, [id]);
  return !!result[0];
}