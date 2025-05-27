import { executeQuery } from '../../db';
import { Device } from '../../interface';

export async function insertDevice(data: { name: string; locationId: number; active?: boolean }): Promise<Device> {
  const query = `
    INSERT INTO "device" ("name", "locationId", "active")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const replacements = [data.name, data.locationId, data.active ?? true];
  const result = await executeQuery(query, replacements);
  return result[0] as Device;
}

export async function getAllDevices(): Promise<Device[]> {
  const query = `SELECT * FROM "device" WHERE "deleted" IS NULL ORDER BY "id" ASC;`;
  return await executeQuery(query, []);
}

export async function getDeviceById(id: number): Promise<Device | null> {
  const query = `SELECT * FROM "device" WHERE "id" = $1 AND "deleted" IS NULL;`;
  const result = await executeQuery(query, [id]);
  return result[0] ?? null;
}

export async function updateDevice(
  id: number,
  data: { name?: string; locationId?: number; active?: boolean }
): Promise<Device | null> {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.name !== undefined) {
    fields.push(`"name" = $${idx++}`);
    values.push(data.name);
  }
  if (data.locationId !== undefined) {
    fields.push(`"locationId" = $${idx++}`);
    values.push(data.locationId);
  }
  if (data.active !== undefined) {
    fields.push(`"active" = $${idx++}`);
    values.push(data.active);
  }
  if (fields.length === 0) return null;

  const query = `
    UPDATE "device"
    SET ${fields.join(', ')}, "updated" = NOW()
    WHERE "id" = $${idx} AND "deleted" IS NULL
    RETURNING *;
  `;
  values.push(id);
  const result = await executeQuery(query, values);
  return result[0] ?? null;
}

export async function deleteDevice(id: number): Promise<boolean> {
  const query = `
    UPDATE "device"
    SET "deleted" = NOW()
    WHERE "id" = $1 AND "deleted" IS NULL
    RETURNING *;
  `;
  const result = await executeQuery(query, [id]);
  return !!result[0];
}