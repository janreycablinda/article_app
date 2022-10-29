import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as ArticleAction  from './articles.actions'
import * as NotificationAction from '../notification/notification.actions'
import { Article, ArticlesDTO, ArticleDTO } from '../articles.state'
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { NotificationState } from '../notification.state';

@Injectable()
export class ArticlesEffects {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private store: Store<any>, private actions$: Actions, private http: HttpClient) {}

  loadArticlesEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.loadArticlesRequestedAction),
    mergeMap(res =>{
      return this.http.get<Article[]>('/api/data/articles').pipe(
          switchMap((data: Article[]) => {
            console.log('effect', data)
            return [
              ArticleAction.loadArticlesSucceededAction({ payload: data })
            ]
          }),
          catchError((error: Error) => {
            return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          })
        )
      }
    )
  ));

  addArticleEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.addArticleRequestedAction),
    mergeMap((action) =>{
      return this.http.post<Article>('/api/data/articles', action.payload).pipe(
          switchMap((data: Article) => [
            NotificationAction.notificationResponse({payload: { type: 'success', message: 'Successfully Added' }}),
            ArticleAction.addArticleSucceddedAction({ payload: data })
          ]),
          catchError((error: Error) => {
            return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          })
        )
      }
    )
  ));

  loadSelectedArticlesEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.loadSelectedArticleRequestedAction),
    mergeMap(action =>{
      return this.http.get<Article>(`/api/data/articles/${action.id}`).pipe(
          switchMap((data: Article) => {
            return [
              ArticleAction.loadSelectedArticleSucceededAction({ payload: data })
            ]
          }),
          catchError((error: Error) => {
            return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          })
        )
      }
    )
  ));

  updateArticleActionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.updateArticleRequestedAction),
    mergeMap(action => {
      return this.http.put<Article>(`/api/data/articles/${action.payload.articleId}`, action.payload.updateArticleDTO).pipe(
          switchMap((data: ArticleDTO) => [
            NotificationAction.notificationResponse({payload: { type: 'success', message: 'Successfully Updated' }}),
            ArticleAction.updateArticleSuccededAction({ payload: data })
          ]),
          catchError((error: Error) => {
            return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          })
        )
      }
    ))
  );

  deleteArticleActionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ArticleAction.deleteArticleRequestedAction),
    mergeMap(action =>{
      console.log(action);
      return this.http.delete<number>(`/api/data/articles/${action.id}`).pipe(
          switchMap(res => [
            NotificationAction.notificationResponse({payload: { type: 'success', message: 'Successfully Deleted' }}),
            ArticleAction.deleteArticleSucceededAction({ id: res })
          ]),
          catchError((error: Error) => {
            return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          })
        )
      }
    ))
  );
}
