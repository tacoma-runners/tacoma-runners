import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RunEvent } from '../models/run.model';
import { AuthService } from '@auth0/auth0-angular';

const baseUrl: string = 'https://tacoma-runners-api.vercel.app/runs';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  private apiEndpoint: string = baseUrl;

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe({
      next: (isAuth) => {
        if (isAuth) this.apiEndpoint += '/admin';
      },
      error: (msg) => {
        console.error(msg);
      }
    });
  }

  getAll(): Observable<RunEvent[]> {
    return this.http.get<RunEvent[]>(this.apiEndpoint);
  }

  get(id: string): Observable<RunEvent> {
    return this.http.get(`${this.apiEndpoint}/${id}`);
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
