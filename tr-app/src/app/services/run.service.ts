import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThursdayRun } from '../models/run.model';

const baseUrl = 'http://localhost:8080/api/runs';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ThursdayRun[]> {
    return this.http.get<ThursdayRun[]>(baseUrl);
  }

  get(id: any): Observable<ThursdayRun> {
    return this.http.get(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<ThursdayRun[]> {
    return this.http.get<ThursdayRun[]>(`${baseUrl}?title=${title}`);
  }
}
