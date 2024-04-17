import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { EventLocation } from '../models/location.model';
import { environment } from '../../environments/environment';

const baseUrl =  `${environment.apiUrl}/locations`;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<EventLocation[]> {
    return this.http.get<EventLocation[]>(baseUrl).pipe(
      tap(results => results.sort((a,b) => a.name.localeCompare(b.name)))
    );
  }

  get(id: string): Observable<EventLocation> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: EventLocation): Observable<EventLocation> {
    return this.http.post(baseUrl, data);
  }

  update(id: string, data: EventLocation): Observable<EventLocation> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
