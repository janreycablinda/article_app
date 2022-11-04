import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as AuthActions from './auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private router:Router, private store:Store) { }

  handleAuthentication(data: any){
    localStorage.setItem('token', data.access_token);
    this.setLogoutTimer(data.expires_in * 1000);
  }

  setLogoutTimer(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.authLogoutRequestedAction());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  logOutUser(){
    this.clearLogoutTimer();
    this.router.navigate(["/login"]);
    localStorage.removeItem('token');
  }

  handleAuthError(data: any){
    console.log(data.statusText);
    switch(data.statusText) {
      case 'Unauthorized':
        localStorage.removeItem('token');
        this.router.navigate(["/login"]);
        break;
    }
  } 
}
