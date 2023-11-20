import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CORE_ROUTES } from './core/core.routes';
import { provideOpenApiBasePath } from './providers/provideOpenApiBasePath';
import { authInterceptor } from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideOpenApiBasePath(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    provideRouter(CORE_ROUTES),
  ],
};
