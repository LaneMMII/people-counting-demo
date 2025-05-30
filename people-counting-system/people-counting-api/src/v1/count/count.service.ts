import { executeQuery } from "../../db";
import { getAggregatedCountQuery } from "./count.queries";
import { CountResponse } from "../../interface";
import { getAllDevicesQuery } from "../device/device.queries";

interface AggregatedCountParams {
  deviceId?: number;    // Wasnt sure if this needed to be optional since you need one 
  locationId?: number;  // or the other I assume it need to be here
  start: string;
  end: string;
  aggregate: string;
}

export const getAggregatedCountService = async (
  params: AggregatedCountParams
): Promise<CountResponse[]> => {
  let deviceIds: number[] = [];
  let deviceNames: Record<number, string> = {};

  // Fetch all devices for name lookup
  const { query, replacements } = getAllDevicesQuery();
  const devices = await executeQuery<any>(query, replacements);

  if (params.deviceId) {
    const device = devices.find(
      (d: any) => d.id === params.deviceId && d.active
    );

    if (!device) return [];

    deviceIds = [device.id];
    deviceNames[device.id] = device.name;

  } else if (params.locationId) {
    const filtered = devices.filter(
      (d: any) => d.locationId === params.locationId && d.active
    );

    deviceIds = filtered.map((d: any) => d.id);
    deviceNames = Object.fromEntries(
      filtered.map((d: any) => [d.id, d.name])
    );

    if (deviceIds.length === 0) return [];

  } else {
    return [];
  }

  // Fetch and aggregate counts for the devices
  const results: CountResponse[] = [];

  for (const id of deviceIds) {
    const { query, replacements } = getAggregatedCountQuery(
      id,
      params.start,
      params.end,
      params.aggregate
    );

    const buckets = await executeQuery<any>(query, replacements);

    results.push({
      deviceId: id,
      name: deviceNames[id],
      counts: buckets.map((b: any) => ({
        timestamp: b.bucket,
        in: Number(b.in),
        out: Number(b.out),
      })),
    });
  }

  return results;
};