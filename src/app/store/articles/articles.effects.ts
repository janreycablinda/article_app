import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as ArticleAction  from './articles.actions'
import { Articles, Article, ArticlesDTO } from '../articles.state'
import { ArticleDTO } from 'src/app/_model/articles-dto';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class ArticlesEffects {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadArticleEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.loadArticlesRequestedArticless),
    mergeMap(res =>{
      return this.http.get<Article[]>('http://127.0.0.1:8000/api/articles').pipe(
          // switchMap((data: ArticlesDTO) => {
          switchMap((data: Article[]) => {
            console.log('effect', data)

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
      return this.http.post<Article>('http://127.0.0.1:8000/api/articles', action.payload).pipe(
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

  updateArticleActionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.updateArticleRequestedAction),
    mergeMap(action => {
      return this.http.put<Article>(`http://127.0.0.1:8000/api/articles/${action.payload.articleId}`, action.payload.updateArticleDTO).pipe(
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
      return this.http.delete<Article>(`http://127.0.0.1:8000/api/articles/${action.payload}`).pipe(
          switchMap(res => [
            ArticleAction.deleteArticleSucceededAction({ payload: res })
          ]),
          catchError((error: Error) => {
            return of(ArticleAction.articlesArticlessFailure({ error: error }));
          })
        )
      }
    ))
  );
}
