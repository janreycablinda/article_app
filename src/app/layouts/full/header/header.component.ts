import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  name: any = '';
  email: string = '';
  nameInitial: any = '';
  constructor(private translate: TranslateService, private store: Store<{ current_user: [any] }>) {
    translate.setDefaultLang('en');
  }

  currentUser$!: Observable<any>;

  onLogout() {
    this.store.dispatch(AuthActions.authLogoutRequestedAction());
  }

  ngOnInit(){
    this.currentUser$ = this.store.select('current_user');
    this.currentUser$.subscribe(res => {
      
      this.name = res.user.name;
      this.email = res.user.email;
      
      if(Object.keys(res.user).length){
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...res.user.name.matchAll(rgx)] || [];
        initials = (
          (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        this.nameInitial = initials;
      }
      
    })
  }
}
