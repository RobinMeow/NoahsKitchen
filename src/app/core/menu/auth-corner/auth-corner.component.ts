import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthDomainService } from '../../auth/auth.domain.service';

@Component({
  selector: 'app-auth-corner',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './auth-corner.component.html',
  styleUrl: './auth-corner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCornerComponent {
  @Input() drawer!: MatDrawer;

  private readonly _authService = inject(AuthDomainService);
  private readonly _router = inject(Router);

  protected tokenSignal: Signal<string | null | undefined> =
    this._authService.getTokenSignal();

  protected logout(): void {}
}
