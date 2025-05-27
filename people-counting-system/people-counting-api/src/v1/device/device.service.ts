import { insertDevice } from "./device.queries";

export async function createDeviceService(data: { name: string; locationId: number; active?: boolean }) {
  return insertDevice(data);
}