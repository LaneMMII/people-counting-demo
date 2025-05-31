import { executeQuery } from "../../db";
import { getAggregatedCountUnifiedQuery } from "./count.queries";
import { CountResponse } from "../../interface";
import { getAllDevicesQuery, getDeviceByIdQuery } from "../device/device.queries";

export const getAggregatedCount = async (
  deviceId: number | undefined,
  locationId: number | undefined,
  start: string | undefined,
  end: string | undefined,
  aggregate: string | undefined
): Promise<CountResponse[]> => {
  const { query, replacements } = getAggregatedCountUnifiedQuery(
    deviceId,
    locationId,
    start ?? "",
    end ?? "",
    aggregate ?? "hour"
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