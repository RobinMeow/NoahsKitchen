import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/shared/API-BASE-URL';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiAuthUrl = `${inject(API_BASE_URL)}/auth`;

  register(
    name: string,
    password: string,
    email: string | null
  ): Observable<void> {
    const body: NewChef = {
      name,
      password,
      email,
    };
    return this._httpClient.post<void>(this._apiAuthUrl, body);
  }
}

type NewChef = {
  name: string;
  password: string;
  email: string | null;
};
