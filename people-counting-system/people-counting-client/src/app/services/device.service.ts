import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Device {
  id: number;
  name: string;
  locationId: number;
  active: boolean;
  created: string;
  updated: string;
  deleted: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<{ devices: Device[] }>(`${this.apiUrl}/device`).pipe(
      map(res => res.devices),
      catchError(err => throwError(() => err))
    );
  }

  getDevice(id: number): Observable<Device> {
    return this.http.get<{ device: Device }>(`${this.apiUrl}/device/${id}`).pipe(
      map(res => res.device),
      catchError(err => throwError(() => err))
    );
  }

  createDevice(device: Device): Observable<Device> {
    return this.http.post<{ device: Device }>(`${this.apiUrl}/device`, device).pipe(
      map(res => res.device),
      catchError(err => throwError(() => err))
    );
  }

  updateDevice(id: number, device: Device): Observable<Device> {
    return this.http.put<{ device: Device }>(`${this.apiUrl}/device/${id}`, device).pipe(
      map(res => res.device),
      catchError(err => throwError(() => err))
    );
  }

  deleteDevice(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/device/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }
}