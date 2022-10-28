import { Injectable } from '@angular/core';

const token_key = 'auth-token'
const user_key = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.localStorage.clear()
  }

  saveToken(token: string): void {
    window.localStorage.removeItem(token_key);
    window.localStorage.setItem(token_key, token);
  }

  getToken(): string | null {
    return window.localStorage.getItem(token_key);
  }

  saveUser(user: any): void {
    window.localStorage.removeItem(user_key);
    window.localStorage.setItem(user_key, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.localStorage.getItem(user_key);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
