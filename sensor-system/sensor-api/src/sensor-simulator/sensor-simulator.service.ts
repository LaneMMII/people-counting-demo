import { type Sensor } from '../interface';

import { getGetActiveSensorsQuery } from './sensor-simluator.queries';

import { executeQuery } from '../db';

/**
 * Get all active sensors
 */
export const getActiveSensors = async (): Promise<Sensor[]> => {
  const { query, replacements } = getGetActiveSensorsQuery();

  const result = await executeQuery<Sensor>(query, replacements);

  return result;
};
