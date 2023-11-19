import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/openapi-services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);

  protected onRegister(): void {
    this._authService
      .authRegisterPost({
        email: 'robin@robin.de',
        name: 'robin',
        password: 'meow',
      })
      .subscribe((t) => {
        console.log(t);
      });
  }
}
