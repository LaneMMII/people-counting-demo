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
      INSERT INTO "count" ("sensorId", "timestamp", "in", "out")
      VALUES ($1, $2, $3, $4);
    `,
    replacements: [
      packet.sensorId,
      packet.timestamp,
      packet.in,
      packet.out,
    ],
  };
};
