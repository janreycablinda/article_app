import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const token_key = 'auth-token'
const user_key = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getLoginUser(data: any) {
    return this.http.post<any>(environment.apiUrl + `api/login`, data, this.httpOptions)
  }

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
