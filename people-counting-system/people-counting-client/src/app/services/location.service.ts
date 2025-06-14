import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Location {
  id: number;
  name: string;
  address: string;
  created: string;
  updated: string;
  deleted: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<{ locations: Location[] }>(`${this.apiUrl}/location`).pipe(
      map(res => res.locations));
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<{ location: Location }>(`${this.apiUrl}/location/${id}`).pipe(
      map(res => res.location));
  }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<{ location: Location }>(`${this.apiUrl}/location`, location).pipe(
      map(res => res.location));
  }

  updateLocation(id: number, location: Location): Observable<Location> {
    return this.http.put<{ location: Location }>(`${this.apiUrl}/location/${id}`, location).pipe(
      map(res => res.location));
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/location/${id}`).pipe();
  }
}