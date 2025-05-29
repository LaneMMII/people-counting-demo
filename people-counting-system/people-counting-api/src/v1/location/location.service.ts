import { 
  getInsertLocationQuery,
  getAllLocationsQuery,
  getLocationByIdQuery,
  getUpdateLocationQuery,
  getDeleteLocationQuery
} from './location.queries';
import { executeQuery } from '../../db';
import { Location } from '../../interface';

export async function createLocation(name: string, address: string): Promise<Location> {
  const { query, replacements } = getInsertLocationQuery(name, address);
  const result = await executeQuery(query, replacements);
  return result[0] as Location;
}

export async function getAllLocations(): Promise<Location[]> {
  const { query, replacements } = getAllLocationsQuery();
  return await executeQuery(query, replacements);
}

export async function getLocationById(id: number): Promise<Location | null> {
  const { query, replacements } = getLocationByIdQuery(id);
  const result = await executeQuery(query, replacements);
  return result[0] ?? null;
}

export async function updateLocation(id: number, name: string, address: string): Promise<Location | null> {
  const { query, replacements } = getUpdateLocationQuery(id, name, address);
  const result = await executeQuery(query, replacements);
  return result[0] ?? null;
}

export async function deleteLocation(id: number): Promise<boolean> {
  const { query, replacements } = getDeleteLocationQuery(id);
  const result = await executeQuery(query, replacements);
  return !!result[0];
}