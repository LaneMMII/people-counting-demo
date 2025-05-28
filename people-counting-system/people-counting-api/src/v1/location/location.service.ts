import {
  insertLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from './location.queries';

export async function createLocationService(data: { name: string; address: string }) {
  return insertLocation(data);
}

export async function getAllLocationsService() {
  return getAllLocations();
}

export async function getLocationByIdService(id: number) {
  return getLocationById(id);
}

export async function updateLocationService(id: number, data: { name?: string; address?: string }) {
  return updateLocation(id, data);
}

export async function deleteLocationService(id: number) {
  return deleteLocation(id);
}