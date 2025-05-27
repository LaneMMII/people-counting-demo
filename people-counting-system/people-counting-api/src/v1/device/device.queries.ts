import { executeQuery } from '../../db';
import { Device } from '../../interface';

export async function insertDevice(data: { name: string; locationId: number; active?: boolean }): Promise<Device> {
  const query = `
    INSERT INTO "Device" ("name", "locationId", "active")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const replacements = [data.name, data.locationId, data.active ?? true];
  const result = await executeQuery(query, replacements);
  return result[0] as Device;
}