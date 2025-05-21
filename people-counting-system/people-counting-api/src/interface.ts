/**
 * "Shape" of required object to execute queries with pg
 */
export interface Query {
  query: string;
  replacements: any[];
}
