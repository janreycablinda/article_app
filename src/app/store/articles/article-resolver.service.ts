import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ArticleActions from './articles.actions'

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverService implements Resolve<any> {

  articles$!: Subscription;

  constructor(
    private store: Store<{ articles: [any] }>
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(ArticleActions.loadArticlesRequestedAction());
    return
  }
  
}
