/**
 * "Shape" of required object to execute queries with pg
 */
export interface Query {
  query: string;
  replacements: any[];
}


//TODO: Extract to sdk
/**
 * "Shape" of a device object
 */
export interface Device {
  id: number;
  name: string;
  locationId: number;
  active: boolean;
  created: string;
  updated: string;
  deleted: string | undefined;
}

//TODO: Extract to sdk
/**
 * "Shape" of a location object
 */
export interface Location {
  id: number;
  name: string;
  address: string;
  created: string;
  updated: string;
  deleted: string | undefined;
}

//TODO: Extract to sdk
/**
 * "Shape" of a count object
 */

export interface Count {
  timestamp: string;
  in: number;
  out: number;
}

export interface CountResponse {
  deviceId: number;
  name: string;
  counts: Count[];
}
