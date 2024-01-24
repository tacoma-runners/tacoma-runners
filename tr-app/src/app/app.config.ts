import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import routes from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    importProvidersFrom(AuthModule.forRoot({
      domain: 'dev-bym2t3cwunsxjdpu.us.auth0.com',
      clientId: 'pDOLML31njEmxLzD70aXD1WVx18KHQBL',
      authorizationParams: {
        redirect_uri: window.document.location.origin
      }
    }))
  ]
};
