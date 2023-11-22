import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthDomainService } from '../auth.domain.service';
import { Chef } from '../Chef';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly _authService = inject(AuthDomainService);
  private readonly _router = inject(Router);
  private readonly _nnfb = inject(NonNullableFormBuilder);

  protected readonly chefConstraints = Chef.Constraints;

  protected readonly loginForm = this._nnfb.group({
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
  });

  protected readonly chefnameControl: FormControl<string> =
    this.loginForm.controls.chefname;

  protected readonly passwordControl: FormControl<string> =
    this.loginForm.controls.password;

  protected hidePassword = true;

  protected onSubmit() {
    console.log('onSubmit called');
  }
}
