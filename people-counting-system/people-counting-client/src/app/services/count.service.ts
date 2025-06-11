import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

@Injectable({ providedIn: 'root' })
export class CountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCountsByDevice(
    deviceId: number,
    start: string,
    end?: string,
    aggregate?: string
  ): Observable<CountResponse> {
    let params = new HttpParams()
      .set('deviceId', deviceId)
      .set('start', start);
    if (end) params = params.set('end', end);
    if (aggregate) params = params.set('aggregate', aggregate);

    return this.http.get<any[]>(`${this.apiUrl}/count`, { params }).pipe(
      map(resArr => {
        const first = resArr[0];
        return {
          counts: first?.counts?.map((c: any) => ({
            timestamp: c.timestamp,
            in: c.in ?? 0,
            out: c.out ?? 0
          })) ?? [],
          aggregate: first?.aggregate ?? aggregate ?? 'minute'
        };
      }),
      catchError(err => throwError(() => err))
    );
  }

  getCountsByLocation(
    locationId: number,
    start: string,
    end?: string,
    aggregate?: string
  ): Observable<CountResponse> {
    let params = new HttpParams()
      .set('locationId', locationId)
      .set('start', start);
    if (end) params = params.set('end', end);
    if (aggregate) params = params.set('aggregate', aggregate);

    return this.http.get<any[]>(`${this.apiUrl}/count`, { params }).pipe(
      map(resArr => {
        const first = resArr[0];
        return {
          counts: first?.counts?.map((c: any) => ({
            timestamp: c.timestamp,
            in: c.in ?? 0,
            out: c.out ?? 0
          })) ?? [],
          aggregate: first?.aggregate ?? aggregate ?? 'minute'
        };
      }),
      catchError(err => throwError(() => err))
    );
  }
}