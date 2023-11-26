import { Signal, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthDomainService } from './auth.domain.service';
import { Chef } from './Chef';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthDomainService);
  const currentUserSignal: Signal<Chef | null> =
    authService.getCurrentUserSignal();

  return currentUserSignal() !== null;
};
