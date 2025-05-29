import { 
    insertDevice,
    getAllDevices,
    getDeviceById,
    updateDevice,
    deleteDevice 
} from './device.queries';

export async function createDevice(name: string, locationId: number, active?: boolean ) {
  return insertDevice({ name, locationId, active });
}

export async function getAllDevices() {
  return getAllDevices();
}

export async function getDeviceById(id: number) {
  return getDeviceById(id);
}

export async function updateDevice(id: number, name?: string, locationId?: number, active?: boolean ) {
  return updateDevice(id, { name, locationId, active });
}

export async function deleteDevice(id: number) {
  return deleteDevice(id);
}