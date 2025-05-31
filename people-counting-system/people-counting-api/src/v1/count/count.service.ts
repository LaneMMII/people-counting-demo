import { executeQuery } from "../../db";
import { getAggregatedCountByDeviceQuery, getAggregatedCountByLocationQuery } from "./count.queries";
import { CountResponse } from "../../interface";
import { getAllDevicesQuery, getDeviceByIdQuery } from "../device/device.queries";

export const getAggregatedCount = async (
  deviceId: number | undefined,
  locationId: number | undefined,
  start: string | undefined,
  end: string | undefined,
  aggregate: string | undefined
): Promise<CountResponse[]> => {
  let queryObj;
  if (deviceId !== undefined) {
    queryObj = getAggregatedCountByDeviceQuery(
      deviceId,
      start ?? "",
      end ?? "",
      aggregate ?? "hour"
    );
  } else if (locationId !== undefined) {
    queryObj = getAggregatedCountByLocationQuery(
      locationId,
      start ?? "",
      end ?? "",
      aggregate ?? "hour"
    );
  } else {
    throw new Error("Either deviceId or locationId must be provided.");
  }

  const { query, replacements } = queryObj;
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