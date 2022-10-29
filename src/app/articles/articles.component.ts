import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from './articles.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ArticleActions from '../store/articles/articles.actions'
import { Article } from '../store/articles.state';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  private articles$!: Subscription;
  articles!: Element;
  formEdit: Boolean = false;
  article!: Article;
  dataSource = new MatTableDataSource<Element>();
  
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ articles: [any] }>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(ArticleActions.loadArticlesRequestedAction());

    this.articles$ = this.store.select('articles').subscribe((res:any) => {

      this.dataSource = res.articles;
      if(this.formEdit){
        if(Object.keys(res.selected_article).length !== 0){
          this._articleForm = this.formBuilder.group({
            id:  new FormControl(res.selected_article.id),
            title:  new FormControl(res.selected_article.title),
            shortDescription: new FormControl(res.selected_article.short_description),
            longDescription: new FormControl(res.selected_article.long_description),
          });
        }
      }else{
        this._articleForm = this.formBuilder.group({
          id:  new FormControl(""),
          title:  new FormControl(""),
          shortDescription: new FormControl(""),
          longDescription: new FormControl(""),
        });
      }
    });

    this.articleForm();
  }

  ngOnDestroy(): void {
    if (this.articles$) {
      this.articles$.unsubscribe();
    }
  }

  displayedColumns = ['title', 'short_description', 'long_description', 'actions'];
  
  _articleForm!: FormGroup;

  articleForm(){
    this._articleForm = this.formBuilder.group({
      id:  new FormControl(""),
      title:  new FormControl(""),
      shortDescription: new FormControl(""),
      longDescription: new FormControl(""),
     });
  }
 
  onAddArticle(){
    if(!this.formEdit){
      var value = this._articleForm.value;
      const data = {
        title: value.title,
        short_description: value.shortDescription,
        long_description: value.longDescription
      };

      this.store.dispatch(ArticleActions.addArticleRequestedAction({payload: data}));

      this._articleForm.reset();
      this._articleForm.setErrors(null);
    }else{
      var value = this._articleForm.value;
      const data = {
        id: value.id,
        title: value.title,
        short_description: value.shortDescription,
        long_description: value.longDescription
      };
      this.store.dispatch(ArticleActions.updateArticleRequestedAction({payload: {articleId: data.id, updateArticleDTO: data }}));
      this.formEdit = false;
    }
    
  }

  onCancelArticle(){
    this.formEdit = false;

    this.store.dispatch(ArticleActions.deSelectArticleAction());
    this._articleForm.reset();
  }

  onEditArticle(id: any){
    this.formEdit = true;
    this.store.dispatch(ArticleActions.loadSelectedArticleRequestedAction({id: id}));
    
  }

  onDeleteArticle(id: any){
    if(confirm("Are you sure you want to delete this?")){
      this.store.dispatch(ArticleActions.deleteArticleRequestedAction({id: id}));
    }
  }
}
