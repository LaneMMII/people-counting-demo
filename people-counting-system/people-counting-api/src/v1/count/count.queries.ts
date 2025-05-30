import { Query } from '../../interface';

export function getAggregatedCountQuery(
  deviceId: number,
  start: string,
  end: string,
  aggregate: string
): Query {
  return {
    query: `
      SELECT
        DATE_TRUNC($4, "timestamp") AS bucket,
        SUM("in") AS in,
        SUM("out") AS out
      FROM "count"
      WHERE "sensorId" = $1
        AND "timestamp" BETWEEN $2 AND $3
      GROUP BY bucket
      ORDER BY bucket ASC;
    `,
    replacements: [deviceId, start, end, aggregate],
  };
}