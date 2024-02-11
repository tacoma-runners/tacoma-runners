import { config } from './app.config.server';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import routes from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule, HttpMethod } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi:true
    },
    provideAnimations(),
    importProvidersFrom(AuthModule.forRoot({
      domain: 'dev-4q6hizgkp6h52g3r.us.auth0.com',
      clientId: '8Le7pkjJ3yHaEWWdB6eYmwDQTiRA6xPO',
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: window.document.location.origin,
        audience: 'https://tacoma-runners-api.vercel.app/',
        scope: 'admin'
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://tacoma-runners-api.vercel.app/runs/*',
            httpMethod: HttpMethod.Get,
            allowAnonymous: true
          },
          {
            uri: 'https://tacoma-runners-api.vercel.app/runs',
            httpMethod: HttpMethod.Post
          },
          {
            uri: 'https://tacoma-runners-api.vercel.app/runs/*',
            httpMethod: HttpMethod.Put
          },
          {
            uri: 'https://tacoma-runners-api.vercel.app/locations/*',
            httpMethod: HttpMethod.Get
          },
          {
            uri: 'https://tacoma-runners-api.vercel.app/locations',
            httpMethod: HttpMethod.Post
          },
          {
            uri: 'https://tacoma-runners-api.vercel.app/locations/*',
            httpMethod: HttpMethod.Put
          }
        ]
      }
    }))
  ]
};
