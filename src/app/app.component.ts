import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AuthActions from "./store/auth/auth.actions"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.store.dispatch(AuthActions.autoLoginRequestedAction());
    }
    
  }
}
