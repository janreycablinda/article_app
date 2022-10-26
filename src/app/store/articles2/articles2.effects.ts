import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Articles2 } from '../articles2.state';
import { catchError, switchMap } from 'rxjs/operators';
import * as Article2Action from './articles2.actions'
import { environment } from 'src/environments/environment';

@Injectable()
export class Articles2Effects {

  constructor(private actions$: Actions,
              private http: HttpClient) {}

  loadArticlesEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(Article2Action.loadArticles2sRequested),
    switchMap(res => {
      return this.http.get<Articles2[]>(environment.apiUrl + 'articles').pipe(
        switchMap((data: Articles2[]) => {
          // console.log(data)
          return [
            Article2Action.loadArticles2sSucceeded({ payload: data })
          ]
        }),
        catchError((error: Error) => {
          return of(Article2Action.loadArticles2sFailure({error: error}))
        })
      )
    })
  ));
  
  addArticlesEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(Article2Action.addArticles2sRequested),
    switchMap(res => {
      return this.http.post<Articles2[]>(environment.apiUrl + 'articles', res.payload).pipe(
        switchMap((data: Articles2[]) => {
          return [
            Article2Action.addArticles2sSucceeded({ payload: data})
          ]
        }),
        catchError((error: Error) => {
          return of(Article2Action.addArticles2sFailure({ error: error }));
        })
      )
    })
  ));

  
}
