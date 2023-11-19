import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.development';

export const API_BASE_URL: InjectionToken<string> = new InjectionToken(
  environment.apiBaseUrl
);
