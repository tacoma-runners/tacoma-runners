import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RunEvent } from '../models/run.model';

const baseUrl = 'https://tacoma-runners-api.vercel.app/runs';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<RunEvent[]> {
    return this.http.get<RunEvent[]>(baseUrl);
  }

  get(id: string): Observable<RunEvent> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getUpcoming(type: string): Observable<RunEvent> {
    return this.http.get(`${baseUrl}/upcoming?runType=${type}`);
  }

  create(data: RunEvent): Observable<RunEvent> {
    return this.http.post(baseUrl, data);
  }

  update(id: string, data: RunEvent): Observable<RunEvent> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
