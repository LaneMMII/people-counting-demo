import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { CountResponse, CountAggregate } from '../interface/count.interface';

@Injectable({ providedIn: 'root' })
export class CountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCountsByDevice(
    deviceId: number,
    start: string,
    end?: string,
    aggregate?: CountAggregate
  ): Observable<CountResponse> {
    let params = new HttpParams()
      .set('deviceId', deviceId)
      .set('start', start);

    if (end) {
      params = params.set('end', end);
    }
    if (aggregate) {
      params = params.set('aggregate', aggregate);
    }

    return this.http.get<CountResponse>(`${this.apiUrl}/count`, { params });
  }

  getCountsByLocation(
    locationId: number,
    start: string,
    end?: string,
    aggregate?: CountAggregate
  ): Observable<CountResponse> {
    let params = new HttpParams()
      .set('locationId', locationId)
      .set('start', start);

    if (end) {
      params = params.set('end', end);
    }
    if (aggregate) {
      params = params.set('aggregate', aggregate);
    }

    return this.http.get<CountResponse>(`${this.apiUrl}/count`, { params });
  }
}