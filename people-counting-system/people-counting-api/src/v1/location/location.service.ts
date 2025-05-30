import { 
  getInsertLocationQuery,
  getAllLocationsQuery,
  getLocationByIdQuery,
  getUpdateLocationQuery,
  getDeleteLocationQuery
} from './location.queries';
import { executeQuery } from '../../db';
import { type Location } from '../../interface';

export async function createLocation(name: string, address: string): Promise<Location> {
  const { query, replacements } = getInsertLocationQuery(name, address);

  const result = await executeQuery<Location>(query, replacements);

  return result[0];
}

export async function getAllLocations(): Promise<Location[]> {  
  const { query, replacements } = getAllLocationsQuery();  

  const result = await executeQuery<Location>(query, replacements);  

  return result;  
}  

export async function getLocationById(id: number): Promise<Location> {  
  const { query, replacements } = getLocationByIdQuery(id);  

  const result = await executeQuery<Location>(query, replacements);  

  return result[0];  
}  

export async function updateLocation(  
  id: number,  
  name: string,  
  address: string,  
): Promise<Location> {  
  const { query, replacements } = getUpdateLocationQuery(id, name, address);  

  const result = await executeQuery<Location>(query, replacements);  

  return result[0];  
}  

export async function deleteLocation(id: number): Promise<Location> {  
  const { query, replacements } = getDeleteLocationQuery(id);  

  const result = await executeQuery<Location>(query, replacements);  

  return result[0];  
}  