import { 
    getInsertDeviceQuery,
    getAllDevicesQuery,
    getDeviceByIdQuery,
    getUpdateDeviceQuery,
    getDeleteDeviceQuery
} from './device.queries';
import { executeQuery } from '../../db';
import { type Device } from '../../interface';

export async function createDevice(
  name: string,
  locationId: number,
  active: boolean,
): Promise<Device> {
  const { query, replacements } = getInsertDeviceQuery(
    name,
    locationId,
    active,
  );

  const result = await executeQuery<Device>(query, replacements);

  return result[0];
}

export async function getAllDevices(): Promise<Device[]> {  
  const { query, replacements } = getAllDevicesQuery();  

  const result = await executeQuery<Device>(query, replacements);  

  return result;  
}  

export async function getDeviceById(id: number): Promise<Device> {  
  const { query, replacements } = getDeviceByIdQuery(id);  

  const result = await executeQuery<Device>(query, replacements);  

  return result[0];  
}  

export async function updateDevice(  
  id: number,  
  name: string,  
  locationId: number,  
  active: boolean,  
): Promise<Device> {  
  const { query, replacements } = getUpdateDeviceQuery(  
    id,  
    name,  
    locationId,  
    active,  
  );  

  const result = await executeQuery<Device>(query, replacements);  

  return result[0];  
}  

export async function deleteDevice(id: number): Promise<Device> {  
  const { query, replacements } = getDeleteDeviceQuery(id);  

  const result = await executeQuery<Device>(query, replacements);  

  return result[0];  
}  