import { Query } from '../../interface';

export function getAggregatedCountUnifiedQuery(
  deviceId: number | undefined,
  locationId: number | undefined,
  start: string,
  end: string,
  aggregate: string
): Query {
  let whereClauses = ['d.active = TRUE'];
  let replacements: any[] = [];
  let paramIndex = 1;

  if (deviceId !== undefined) {
    whereClauses.push(`d.id = $${paramIndex++}`);
    replacements.push(deviceId);
  }
  if (locationId !== undefined) {
    whereClauses.push(`d."locationId" = $${paramIndex++}`);
    replacements.push(locationId);
  }
  whereClauses.push(`c."timestamp" BETWEEN $${paramIndex} AND $${paramIndex + 1}`);
  replacements.push(start, end);
  paramIndex += 2;
  // aggregate is always last
  const aggregateParam = `$${paramIndex}`;
  replacements.push(aggregate);

  return {
    query: `
      SELECT
        d.id AS deviceId,
        d.name AS deviceName,
        DATE_TRUNC(${aggregateParam}, c."timestamp") AS bucket,
        SUM(c."in") AS in,
        SUM(c."out") AS out
      FROM "count" c
      JOIN "device" d ON c."sensorId" = d.id
      WHERE ${whereClauses.join(' AND ')}
      GROUP BY d.id, d.name, bucket
      ORDER BY d.id, bucket ASC;
    `,
    replacements,
  };
}