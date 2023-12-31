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

  get(id: any): Observable<RunEvent> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getUpcoming(type: string): Observable<RunEvent> {
    return this.http.get(`${baseUrl}/upcoming?runType=${type}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  /* findByTitle(title: any): Observable<RunEvent[]> {
    return this.http.get<RunEvent[]>(`${baseUrl}?title=${title}`);
  } */
}
