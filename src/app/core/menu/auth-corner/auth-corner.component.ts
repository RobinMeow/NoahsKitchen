import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-corner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-corner.component.html',
  styleUrl: './auth-corner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCornerComponent {
  private _sub: Subscription;

  protected isAuthenticated: boolean = false;
  @Input() drawer!: MatDrawer;

  constructor(protected _authService: AuthService, private _router: Router) {
    this._sub = this._authService.isAuthenticated$.subscribe((isAuthed) => {
      this.isAuthenticated = isAuthed;
    });
  }

  redirectToSignup() {
    this._router.navigateByUrl('/signup');
  }

  redirectToLogin() {
    this._router.navigateByUrl('/signin');
  }

  async logout() {
    await this._authService.logout();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
