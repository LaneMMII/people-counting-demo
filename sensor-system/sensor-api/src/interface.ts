/**
 * "Shape" of required object to execute queries with pg
 */
export interface Query {
  query: string;
  replacements: any[];
}

export interface Sensor {
  id: number;
  name: string;
  firmwareVersion: string;
  mountHeight: number;
  businessStartTime: Date;
  businessEndTime: Date;
  dataPushEndpoint: string;
}
