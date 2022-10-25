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
import jwtDecode from "jwt-decode";

@Injectable()
export class AuthEffects {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private actions$: Actions, private http: HttpClient, private authService:AuthService) {}

  loginUserEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.loginRequestedAction),
    mergeMap((data) =>{
      
      return this.http.post<AuthResponsData>('/api/auth/login', data).pipe(
          switchMap((data: AuthResponsData) => {
            console.log(data);
            return [
              AuthAction.getUserDataRequestedAction({ payload: data.access_token }),
              AuthAction.loginSucceededAction({ payload: data }),
            ]
          }),
          catchError((error: Error) => {
            
            return of(AuthAction.loadAuthsFailure({ error: error }));
          })
        )
      }
    )
  ));

  refetchUserEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.getUserDataRequestedAction),
    mergeMap((data) =>{
      
      this.httpOptions = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${data.payload}` })
      };
      
      return this.http.post<AuthResponsData>('/api/auth/me', data, this.httpOptions).pipe(
          switchMap((data: AuthResponsData) => {
            console.log(data);
            this.authService.handleAuthentication(data);
            return [
              AuthAction.loginSucceededAction({ payload: data }),
            ]
          }),
          catchError((error: Error) => {
            
            return of(AuthAction.loadAuthsFailure({ error: error }));
          })
        )
      }
    )
  ));
}
