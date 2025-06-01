import { executeQuery } from "../../db";
import { getAggregatedCountByDeviceQuery, getAggregatedCountByLocationQuery } from "./count.queries";
import { CountResponse } from "../../interface";

// Get aggregated count by device
export const getAggregatedCountByDevice = async (
  deviceId: number,
  start: string,
  end: string,
  aggregate: string
): Promise<CountResponse[]> => {
  const { query, replacements } = getAggregatedCountByDeviceQuery(
    deviceId,
    start,
    end,
    aggregate
  );
  const rows = await executeQuery<any>(query, replacements);

  // Group results by device
  const grouped: Record<number, CountResponse> = {};
  for (const row of rows) {
    if (!grouped[row.deviceid]) {
      grouped[row.deviceid] = {
        deviceId: row.deviceid,
        name: row.devicename,
        counts: [],
      };
    }
    grouped[row.deviceid].counts.push({
      timestamp: row.bucket,
      in: Number(row.in),
      out: Number(row.out),
    });
  }
  return Object.values(grouped);
};

// Get aggregated count by location
export const getAggregatedCountByLocation = async (
  locationId: number,
  start: string,
  end: string,
  aggregate: string
): Promise<CountResponse[]> => {
  const { query, replacements } = getAggregatedCountByLocationQuery(
    locationId,
    start,
    end,
    aggregate
  );
  const rows = await executeQuery<any>(query, replacements);

  // Group results by device
  const grouped: Record<number, CountResponse> = {};
  for (const row of rows) {
    if (!grouped[row.deviceid]) {
      grouped[row.deviceid] = {
        deviceId: row.deviceid,
        name: row.devicename,
        counts: [],
      };
    }
    grouped[row.deviceid].counts.push({
      timestamp: row.bucket,
      in: Number(row.in),
      out: Number(row.out),
    });
  }
  return Object.values(grouped);
};