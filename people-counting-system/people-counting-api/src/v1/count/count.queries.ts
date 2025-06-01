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
        d.id AS deviceId,
        d.name AS deviceName,
        DATE_TRUNC($1, c."timestamp") AS bucket,
        SUM(c."in") AS in,
        SUM(c."out") AS out
      FROM "count" c
      WHERE d.active = TRUE
        AND d.id = $2
        AND c."timestamp" BETWEEN $3 AND $4
      GROUP BY d.id, d.name, bucket
      ORDER BY d.id, bucket ASC;
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
        d.id AS deviceId,
        d.name AS deviceName,
        DATE_TRUNC($1, c."timestamp") AS bucket,
        SUM(c."in") AS in,
        SUM(c."out") AS out
      FROM "count" c
      WHERE d.active = TRUE
        AND d."locationId" = $2
        AND c."timestamp" BETWEEN $3 AND $4
      GROUP BY d.id, d.name, bucket
      ORDER BY d.id, bucket ASC;
    `,
    replacements: [aggregate, locationId, start, end],
  };
}