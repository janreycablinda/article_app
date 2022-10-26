import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  onLogout() {
    console.log('logout');
    // this.store.dispatch(new AuthActions.Logout());
  }
}
