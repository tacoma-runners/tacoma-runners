import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RunEvent } from '../models/run.model';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment';
import { RunList } from '../models/runlist.model';

const baseUrl: string = `${environment.apiUrl}/runs`;

@Injectable({
  providedIn: 'root'
})
export class RunService {

  private apiEndpoint: string = baseUrl;

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe({
      next: (isAuth) => {
        this.apiEndpoint = (isAuth) ? baseUrl + '/admin' : baseUrl;
      },
      error: (msg) => {
        console.error(msg);
        this.apiEndpoint = baseUrl;
      }
    });
  }

  getPage(page: number = 1, take: number = 5): Observable<RunList> {
    return this.http.get<RunList>(this.apiEndpoint, {
        params: {
          take: take,
          page: page,
        }
      }
    );
  }

  getAll(): Observable<RunList> {
    return this.http.get<RunList>(this.apiEndpoint);
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
