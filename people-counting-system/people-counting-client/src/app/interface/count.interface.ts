export type CountAggregate = 'minute' | 'hour' | 'day' | 'week';

export interface CountData {
  timestamp: string;
  in: number;
  out: number;
}

export interface CountResponse {
  counts: CountData[];
  aggregate: CountAggregate;
}