// ingest.queries.ts

import { type Query } from '../../interface';

interface SensorPacket {
  sensorId: number;
  name: string;
  timestamp: string;
  in: number;
  out: number;
}

export const insertSensorDataQuery = (packet: SensorPacket): Query => {
  return {
    query: `
      INSERT INTO sensor_data ("sensorId", "name", "timestamp", "in", "out")
      VALUES (?, ?, ?, ?, ?);
    `,
    replacements: [
      packet.sensorId,
      packet.name,
      packet.timestamp,
      packet.in,
      packet.out,
    ],
  };
};
