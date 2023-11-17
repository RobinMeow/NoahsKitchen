import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { applicationName } from 'src/app.globals';

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent implements OnInit {
  protected readonly applicationName = applicationName;
  @Input({ required: true }) drawer!: MatDrawer;

  ngOnInit(): void {
    this.drawer.open();
  }

  protected toggleMenu(): void {
    this.drawer.toggle();
  }
}
