import { Component, OnInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ArticleActions from '../store/articles/articles.actions'
import { Subscription } from 'rxjs';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private store: Store<{ articles: [any] }>
              ) { }

  articleForm!: FormGroup;
  articles$!: Subscription;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'shortDescription', 'date', 'action'];

  getArticleForm(){
    this.articleForm = this.formBuilder.group({
      id:  new FormControl(""),
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
    })
    
  }

  openDialog(){
    this.dialog.open(DialogComponent, {});
  }

  onEditArticle(row: any){
    this.store.dispatch(ArticleActions.loadSelectedArticleRequestedAction({id: row.id}));
  }

  applyEvent(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteArticle(id: any){
    if(confirm("Are you sure you want to delete this?")){
      this.store.dispatch(ArticleActions.deleteArticleRequestedAction({id: id}));
    }
  }

  ngOnInit(): void {
    this.getArticleForm();

    this.store.dispatch(ArticleActions.loadArticlesRequestedAction());
    
    this.articles$ = this.store.select('articles').subscribe((res:any) => {
      this.dataSource = new MatTableDataSource(res.articles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(Object.keys(res.selected_article).length !== 0){
        this.dialog.open(DialogComponent, {
          data: res.selected_article
        }).afterClosed().subscribe(() => {
          this.store.dispatch(ArticleActions.deSelectArticleAction());
        })
      }
    });
  }

  ngOnDestroy(): void {
    if (this.articles$) {
      this.articles$.unsubscribe();
    }
  }
}
 

