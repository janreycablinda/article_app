import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';

import * as Article2Action from './articles2.actions'
import { Articles2 } from '../articles2.state';
import { environment } from 'src/environments/environment';

@Injectable()
export class Articles2Effects {

  constructor(private actions$: Actions,
    private http: HttpClient) { }

  loadArticlesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(Article2Action.loadArticles2sRequested),
      mergeMap((res) => {
        return this.http.get<Articles2[]>(environment.apiUrl + 'api/products').pipe(
          switchMap((data: Articles2[]) => {
            return [
              Article2Action.loadArticles2sSucceeded({ payload: data })
            ]
          }),
          catchError((error: Error) => {
            return of(Article2Action.loadArticles2sFailure({ error: error }))
          })
        )
      })
    ));

  addArticlesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(Article2Action.addArticles2sRequested),
      mergeMap((res) => {
        return this.http.post<Articles2>(environment.apiUrl + 'api/products', res.payload).pipe(
          switchMap((data: Articles2) => {
            console.log(data);
            return [
              Article2Action.addArticles2sSucceeded({ payload: data })
            ]
          }),
          catchError((error: Error) => {
            return of(Article2Action.addArticles2sFailure({ error: error }));
          })
        )
      })
    ));

  deleteArticlesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(Article2Action.deleteArticles2sRequested),
      mergeMap((res) => {
        return this.http.delete<number>(environment.apiUrl + `api/products/${res.id}`).pipe(
          switchMap((res) => {
            return [
              Article2Action.deleteArticles2sSucceeded({ id: res })
            ]
          }),
          catchError((error: Error) => {
            return of(Article2Action.deleteArticles2sFailure({ error: error }))
          })
        )
      })
    ));

  updateArticlesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(Article2Action.updateArticles2sRequested),
      mergeMap((res) => {
        return this.http.put<Articles2>(environment.apiUrl + `api/products/${res.payload.articleId}`, res.payload.updateArticle).pipe(
          switchMap((data: Articles2) => {
            console.log(data);
            return [
              Article2Action.updateArticles2sSucceeded({ payload: data })
            ]
          }),
          catchError((error: Error) => {
            return of(Article2Action.updateArticles2sFailure({ error: error }))
          })
        )
      })
    ))
}
