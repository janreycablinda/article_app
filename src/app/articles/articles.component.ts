import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from './articles.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ArticleActions from '../store/articles/articles.actions'
import { selectArticles } from '../store/articles/articles.selectors';
import { Article } from '../store/articles.state';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles$!: Observable<any>;
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

    // this.articles$ = this.store.pipe(select(selectArticles))
    this.articles$ = this.store.select('articles');
    // this.articles$ = this.store.select();
    // this.articles$ = this.store.pipe(select(selectArticles))

    this.articles$.subscribe(res => {
      console.log(res);
      this.dataSource = res.articles;
      if(this.formEdit){
        console.log(this.formEdit);
        console.log(true);
        if(Object.keys(res.selected_article).length !== 0){
          this._articleForm = this.formBuilder.group({
            id:  new FormControl(res.selected_article.id),
            title:  new FormControl(res.selected_article.title),
            shortDescription: new FormControl(res.selected_article.short_description),
            longDescription: new FormControl(res.selected_article.long_description),
          });
        }
      }else{
        console.log(false);
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

  displayedColumns = ['id', 'title', 'short_description', 'long_description', 'actions'];
  
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
    // console.log(data);
    // this._articleForm = this.formBuilder.group({
    //   id:  new FormControl(data.id),
    //   title:  new FormControl(data.title),
    //   shortDescription: new FormControl(data.short_description),
    //   longDescription: new FormControl(data.long_description),
    //  });
  }

}


const ELEMENT_DATA: Element[] = [
  // { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  // { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  // { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  // { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  // { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  // { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  // { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  // { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  // { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  // { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  // { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  // { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  // { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  // { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  // { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  // { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  // { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  // { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  // { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  // { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
