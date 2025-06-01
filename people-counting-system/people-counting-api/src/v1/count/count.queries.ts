import { Query } from '../../interface';

export function getAggregatedCountByDeviceQuery(
  deviceId: number,
  start: string,
  end: string,
  aggregate: string
): Query {
  return {
    query: `
      SELECT
        c."deviceId" AS deviceId,
        DATE_TRUNC($1, c."timestamp") AS bucket,
        SUM(c."in") AS in,
        SUM(c."out") AS out
      FROM "count" c
      WHERE c."deviceId" = $2
        AND c."timestamp" BETWEEN $3 AND $4
      GROUP BY c."deviceId", bucket
      ORDER BY c."deviceId", bucket ASC;
    `,
    replacements: [aggregate, deviceId, start, end],
  };
}

export function getAggregatedCountByLocationQuery(
  locationId: number,
  start: string,
  end: string,
  aggregate: string
): Query {
  return {
    query: `
      SELECT
        c."deviceId" AS deviceId,
        DATE_TRUNC($1, c."timestamp") AS bucket,
        SUM(c."in") AS in,
        SUM(c."out") AS out
      FROM "count" c
      JOIN "device" d ON d.id = c."deviceId"
      WHERE d."locationId" = $2
        AND c."timestamp" BETWEEN $3 AND $4
      GROUP BY c."deviceId", bucket
      ORDER BY c."deviceId", bucket ASC;
    `,
    replacements: [aggregate, locationId, start, end],
  };
}