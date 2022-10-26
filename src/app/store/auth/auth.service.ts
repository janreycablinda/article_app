import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor() { }

  handleAuthentication(data: any){
    console.log(data);
    localStorage.setItem('token', data.access_token);
    this.setLogoutTimer(data.expires_in * 1000);
  }

  autoLogin(){
    
  }

  setLogoutTimer(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      // this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
