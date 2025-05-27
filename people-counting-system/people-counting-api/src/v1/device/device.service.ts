import { 
    insertDevice,
    getAllDevices,
    getDeviceById,
    updateDevice,
    deleteDevice } from "./device.queries";

export async function createDeviceService(data: { name: string; locationId: number; active?: boolean }) {
  return insertDevice(data);
}

export async function getAllDevicesService() {
  return getAllDevices();
}

export async function getDeviceByIdService(id: number) {
  return getDeviceById(id);
}

export async function updateDeviceService(id: number, data: { name?: string; locationId?: number; active?: boolean }) {
  return updateDevice(id, data);
}

export async function deleteDeviceService(id: number) {
  return deleteDevice(id);
}