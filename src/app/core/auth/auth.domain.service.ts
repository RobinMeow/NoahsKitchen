import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService, RegisterChefDto } from 'src/app/openapi-services';
import { RegisterChef } from './register/RegisterChef';
import { LoginCredentials } from './LoginCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthDomainService {
  private readonly _authService = inject(AuthService);

  registerAsync(chef: RegisterChef): Promise<void> {
    const dto: RegisterChefDto = {
      ...chef,
    };
    return firstValueFrom(this._authService.authRegisterPost(dto));
  }

  loginAsync(credentials: LoginCredentials): Promise<string> {
    if (credentials.name.length === 0)
      throw new Error('Login name may not be missing.');
    if (credentials.password.length === 0)
      throw new Error('Login password may not be empty.');

    return firstValueFrom(this._authService.authLoginPost(credentials));
  }
}
