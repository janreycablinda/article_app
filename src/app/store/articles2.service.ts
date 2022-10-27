import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as Articles2Action from '../store/articles2/articles2.actions'

@Injectable({
  providedIn: 'root'
})
export class Articles2Service {
  articles2$!: Observable<any>

  constructor(private store: Store<any>) { }

  fetchArticles() {
    this.store.dispatch(Articles2Action.loadArticles2sRequested())
    this.articles2$ = this.store.select('articles2')
    return this.articles2$;
  }

}
