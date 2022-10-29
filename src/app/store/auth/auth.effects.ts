import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { tap } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { UserData, AuthResponsData } from '../auth.state';
import * as AuthAction from './auth.actions'
import { AuthService } from './auth.service'
import { Router } from "@angular/router";
import { User } from './user.model';
import * as NotificationAction from '../notification/notification.actions'

@Injectable()
export class AuthEffects {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private actions$: Actions, 
    private http: HttpClient, 
    private authService:AuthService,
    private router: Router
  ) {}

  loginUserEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.loginRequestedAction),
    mergeMap((data) =>{
      
      return this.http.post<AuthResponsData>('/api/auth/login', data).pipe(
          switchMap((data: AuthResponsData) => {
            this.authService.handleAuthentication(data);
            return [
              AuthAction.getUserDataRequestedAction({ payload: data })
            ]
          }),
          catchError((error: Error) => {
            this.authService.handleAuthError(error);
            return of(NotificationAction.notificationResponse({payload: { type: 'authError', message: 'Username or Password is incorrect!' }}));
          })
        )
      }
    )
  ));

  fetchUserEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.getUserDataRequestedAction),
    mergeMap(() =>{
      
      return this.http.get<User>('/api/auth/me').pipe(
          switchMap((data: User) => {
            console.log(data);
            this.router.navigate(["/articles"]);
            
            return [
              AuthAction.loginSucceededAction({ payload: data }),
            ]
          }),
          catchError((error: Error) => {
            this.authService.handleAuthError(error);
            return of(NotificationAction.notificationResponse({payload: { type: 'authError', message: 'Username or Password is incorrect!' }}));
          })
        )
      }
    )
  ));

  autoLoginEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.autoLoginRequestedAction),
    mergeMap(() => {
      return this.http.get<User>('/api/auth/me').pipe(
          switchMap((data: User) => {
            const token:any = localStorage.getItem('token');
            const user = new User(
              data.name,
              data.email,
              token
            );
            if(token) {
              if(this.router.url === '/login'){
                this.router.navigate(["/articles"]);
              }
            }
            return [
              AuthAction.autoLoginSucceededAction({ payload: data }),
            ]
          }),
          catchError((error: Error) => {
            this.authService.handleAuthError(error);
            return of(NotificationAction.notificationResponse({payload: { type: 'authError', message: 'Username or Password is incorrect!' }}));
          })
        )
      }
    )
  ));

  authLogoutEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.authLogoutRequestedAction),
    mergeMap((data) =>{
      return this.http.post<any>('/api/auth/logout', {}).pipe(
          switchMap(() => {
            this.authService.logOutUser();
            return [
              AuthAction.authLogoutSucceededAction(),
            ]
          }),
          catchError((error: Error) => {
            return of(NotificationAction.notificationResponse({payload: { type: 'authError', message: 'Ops, Something went wrong!' }}));
          })
        )
      }
    )
  ));
}
