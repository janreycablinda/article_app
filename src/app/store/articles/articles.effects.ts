import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as ArticleAction  from './articles.actions'
import { Article, ArticlesDTO, ArticleDTO } from '../articles.state'
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class ArticlesEffects {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadArticlesEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.loadArticlesRequestedAction),
    mergeMap(res =>{
      return this.http.get<Article[]>('/api/articles').pipe(
          switchMap((data: Article[]) => {
            // console.log('effect', data)
            return [
              ArticleAction.loadArticlesSucceededAction({ payload: data })
            ]
          }),
          catchError((error: Error) => {
            return of(ArticleAction.articlesArticlessFailure({ error: error }));
          })
        )
      }
    )
  ));

  addArticleEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.addArticleRequestedAction),
    mergeMap((action) =>{
      return this.http.post<Article>('/api/articles', action.payload).pipe(
          switchMap((data: Article) => [
            ArticleAction.addArticleSucceddedAction({ payload: data })
          ]),
          catchError((error: Error) => {
            return of(ArticleAction.articlesArticlessFailure({ error: error }));
          })
        )
      }
    )
  ));

  loadSelectedArticlesEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.loadSelectedArticleRequestedAction),
    mergeMap(action =>{
      return this.http.get<Article>(`/api/articles/${action.id}`).pipe(
          switchMap((data: Article) => {
            return [
              ArticleAction.loadSelectedArticleSucceededAction({ payload: data })
            ]
          }),
          catchError((error: Error) => {
            return of(ArticleAction.articlesArticlessFailure({ error: error }));
          })
        )
      }
    )
  ));

  updateArticleActionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.updateArticleRequestedAction),
    mergeMap(action => {
      return this.http.put<Article>(`/api/articles/${action.payload.articleId}`, action.payload.updateArticleDTO).pipe(
          switchMap((data: ArticleDTO) => [
            ArticleAction.updateArticleSuccededAction({ payload: data })
          ]),
          catchError((error: Error) => {
            return of(ArticleAction.articlesArticlessFailure({ error: error }));
          })
        )
      }
    ))
  );

  deleteArticleActionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.deleteArticleRequestedAction),
    mergeMap(action =>{
      console.log(action);
      return this.http.delete<number>(`/api/articles/${action.id}`).pipe(
          switchMap(res => [
            ArticleAction.deleteArticleSucceededAction({ id: res })
          ]),
          catchError((error: Error) => {
            return of(ArticleAction.articlesArticlessFailure({ error: error }));
          })
        )
      }
    ))
  );
}
