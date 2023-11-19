import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/openapi-services';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-corner',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './auth-corner.component.html',
  styleUrl: './auth-corner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCornerComponent {
  private _sub: Subscription = Subscription.EMPTY;

  protected isAuthenticated: boolean = false;
  @Input() drawer!: MatDrawer;

  constructor(protected _authService: AuthService, private _router: Router) {
    // this._sub = this._authService..isAuthenticated$.subscribe((isAuthed) => {
    //   this.isAuthenticated = isAuthed;
    // });
  }

  async logout() {
    // await this._authService.logout();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
