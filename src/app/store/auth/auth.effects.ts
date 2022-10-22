import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { UserData } from '../auth.state';
import * as AuthAction from './auth.actions'
import { AuthService } from './auth.service'

@Injectable()
export class AuthEffects {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private actions$: Actions, private http: HttpClient, private authService:AuthService) {}

  loginUserEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.loginRequestedAction),
    mergeMap((data) =>{
      console.log(data);
      return this.http.post<UserData>('/api/auth/login', data).pipe(
          switchMap((data: UserData) => {
            this.authService.handleAuthentication(data);
            return [
              AuthAction.loginSucceededAction({ payload: data })
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
