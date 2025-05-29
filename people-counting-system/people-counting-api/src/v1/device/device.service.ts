import { 
    getInsertDeviceQuery,
    getAllDevicesQuery,
    getDeviceByIdQuery,
    getUpdateDeviceQuery,
    getDeleteDeviceQuery
} from './device.queries';
import { executeQuery } from '../../db';
import { Device } from '../../interface';

export async function createDevice(name: string, locationId: number, active: boolean): Promise<Device> {
  const { query, replacements } = getInsertDeviceQuery(name, locationId, active);
  const result = await executeQuery(query, replacements);
  return result[0] as Device;
}

export async function getAllDevices(): Promise<Device[]> {
  const { query, replacements } = getAllDevicesQuery();
  return await executeQuery(query, replacements);
}

export async function getDeviceById(id: number): Promise<Device | null> {
  const { query, replacements } = getDeviceByIdQuery(id);
  const result = await executeQuery(query, replacements);
  return result[0] ?? null;
}

export async function updateDevice(id: number, name: string, locationId: number, active: boolean): Promise<Device | null> {
  const { query, replacements } = getUpdateDeviceQuery(id, name, locationId, active);
  const result = await executeQuery(query, replacements);
  return result[0] ?? null;
}

export async function deleteDevice(id: number): Promise<boolean> {
  const { query, replacements } = getDeleteDeviceQuery(id);
  const result = await executeQuery(query, replacements);
  return !!result[0];
}