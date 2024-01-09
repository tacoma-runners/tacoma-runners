import { DOCUMENT } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  fakeUsername: string = "admin";
  fakePassword: string = "run";

  localStorage:Storage | undefined;

  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.localStorage = doc.defaultView?.localStorage
  }

  login(username: string, password: string): Observable<any> {
    // Mock a successful call to an API server.
    if (this.localStorage && username == this.fakeUsername && password == this.fakePassword) {
      this.localStorage.setItem("token", "my-super-secret-token-from-server");
      return of(new HttpResponse({ status: 200 }));
    } else {
      return of(new HttpResponse({ status: 401 }));
    }
  }

  logout(): void {
    if (this.localStorage) this.localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    if (this.localStorage && this.localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }
}

export const AuthenticationGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthenticationService).canActivate(next, state);
};
