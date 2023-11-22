import {
  EffectRef,
  Injectable,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService, RegisterChefDto } from 'src/app/openapi-services';
import { RegisterChef } from './register/RegisterChef';
import { LoginCredentials } from './LoginCredentials';
import { TokenStorage } from './token.storage';

@Injectable({
  providedIn: 'root',
})
export class AuthDomainService {
  private readonly _authService = inject(AuthService);
  private readonly _tokenStorage = inject(TokenStorage);
  private readonly _tokenSignal: WritableSignal<string | null | undefined> =
    signal(undefined);

  private readonly _onTokenChanged: EffectRef = effect(() => {
    const token = this._tokenSignal();

    if (token === undefined) return;

    if (token !== null) {
      this._tokenStorage.store(token);
    } else {
      this._tokenStorage.clear();
    }
  });

  constructor() {
    const token: string | null = this._tokenStorage.retrieve();
    this._tokenSignal.set(token);
  }

  registerAsync(chef: RegisterChef): Promise<void> {
    const dto: RegisterChefDto = {
      ...chef,
    };
    return firstValueFrom(this._authService.authRegisterPost(dto));
  }

  async loginAsync(credentials: LoginCredentials): Promise<string> {
    if (credentials.name.length === 0)
      throw new Error('Login name may not be missing.');

    if (credentials.password.length === 0)
      throw new Error('Login password may not be empty.');

    const token = await firstValueFrom(
      this._authService.authLoginPost(credentials),
    );

    this._tokenSignal.set(token);

    return token;
  }

  logout(): void {
    this._tokenSignal.set(null);
  }

  /**
   * @returns the token string when the chef is logged in or null if not.
   * If it is undefined the tokenStorage has not been retrieved yet.
   */
  public getTokenSignal(): Signal<string | null | undefined> {
    return this._tokenSignal.asReadonly();
  }
}
