import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [
    SharedModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent implements OnInit {
  protected readonly NoahsKitchenName = 'NoahsKitchen.Name';

  @Input({ required: true }) drawer!: MatDrawer;

  ngOnInit(): void {
    this.drawer.open();
  }

  protected toggleMenu(): void {
    this.drawer.toggle();
  }
}
