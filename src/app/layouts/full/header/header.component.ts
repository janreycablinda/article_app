import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private translate: TranslateService, private store: Store<any>) {
    translate.setDefaultLang('en');
  }

  onLogout() {
    console.log('logout');
    this.store.dispatch(AuthActions.authLogoutRequestedAction());
  }
}
