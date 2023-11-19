import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CORE_ROUTES } from './app/core/core.routes';
import { provideOpenApiBasePath } from './app/providers/provideOpenApiBasePath';

bootstrapApplication(AppComponent, {
  providers: [
    provideOpenApiBasePath(),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule
    ),
    provideRouter(CORE_ROUTES),
  ],
}).catch((err) => console.error(err));
