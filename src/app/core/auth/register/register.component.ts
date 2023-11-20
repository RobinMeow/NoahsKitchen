import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDomainService } from '../auth.domain.service';
import { RegisterChef } from './RegisterChef';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly _authService = inject(AuthDomainService);
  private readonly _router = inject(Router);

  protected async onRegister(): Promise<void> {
    const chef: RegisterChef = {
      email: 'robin@robin.de',
      name: 'robin',
      password: 'meow',
    };
    await this._authService.registerAsync(chef);
    await this._authService.loginAsync(chef);
    this._router.navigateByUrl('/');
  }
}
