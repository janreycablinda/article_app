import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ArticleActions from '../store/articles/articles.actions'
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<{ articles: [any] }>) { }

  private articleObs$!: Subscription;
  articleCount!: number;

  ngOnInit(): void {
    this.store.dispatch(ArticleActions.loadArticlesRequestedAction());

    this.articleObs$ = this.store.select('articles').subscribe((res:any) => {
      console.log();
      this.articleCount = res.articles.length;
    });
    
  }

  ngOnDestroy(): void {
    if (this.articleObs$) {
      this.articleObs$.unsubscribe();
    }
  }

}
