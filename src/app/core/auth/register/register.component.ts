import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDomainService } from '../auth.domain.service';
import { RegisterChef } from './RegisterChef';
import { Router } from '@angular/router';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Chef } from '../Chef';

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly _authService = inject(AuthDomainService);
  private readonly _router = inject(Router);
  private readonly _nnfb = inject(NonNullableFormBuilder);

  protected readonly chefConstraints = Chef.Constraints;

  protected readonly registerForm = this._nnfb.group({
    chefname: [
      '',
      [
        Validators.required,
        Validators.minLength(this.chefConstraints.name.minLength),
        Validators.maxLength(this.chefConstraints.name.maxLength),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.chefConstraints.password.minLength),
        Validators.maxLength(this.chefConstraints.password.maxLength),
      ],
    ],
    email: ['', [Validators.email]],
  });

  protected hidePassword = true;

  protected getInvalidEmailMessage() {
    return this.registerForm.controls.email.hasError('email')
      ? 'Ungültige E-Mail'
      : '';
  }

  async onSubmit(): Promise<void> {
    await this.registerAndLogin();
    this._router.navigateByUrl('/');
  }

  async registerAndLogin(): Promise<void> {
    const chef: RegisterChef = {
      name: this.registerForm.controls.chefname.value,
      password: this.registerForm.controls.password.value,
      email: this.registerForm.controls.email.value,
    };
    await this._authService.registerAsync(chef);
    await this._authService.loginAsync(chef);
  }
}
