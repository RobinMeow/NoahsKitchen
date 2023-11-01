import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NgSwitch,
  NgSwitchDefault,
  NgSwitchCase,
  CommonModule,
} from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RouterOutlet,
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
