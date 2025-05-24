// ingest.service.ts

import { insertSensorDataQuery } from './ingest.queries';
import { executeQuery } from '../../db';

interface SensorPacket {
  sensorId: number;
  name: string;
  timestamp: string;
  in: number;
  out: number;
}

export const ingestSensorDataService = async (packet: SensorPacket) => {
  const { query, replacements } = insertSensorDataQuery(packet);

  await executeQuery(query, replacements);
};
