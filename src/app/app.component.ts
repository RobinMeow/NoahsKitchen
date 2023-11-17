import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './core/header/header.component';
import { MenuComponent } from './core/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    TranslateModule,
    RouterOutlet,
    MatSidenavModule,
    MenuComponent,
    HeaderComponent,
  ],
})
export class AppComponent implements OnInit {
  private readonly _translateService = inject(TranslateService);

  protected readonly NoahsKitchenName: string = 'NoahsKitchen.Name';

  ngOnInit(): void {
    this._translateService.setDefaultLang('de');
    this._translateService.use('de');
  }
}
