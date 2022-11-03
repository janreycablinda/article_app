import { Component, OnInit, ViewChild, TemplateRef, Inject } from '@angular/core';
import { Articles2 } from './articles2.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ArticleActions from '../store/articles/articles.actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles2',
  templateUrl: './articles2.component.html',
  styleUrls: ['./articles2.component.scss']
})
export class Articles2Component implements OnInit {

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private store: Store<{ articles: [any] }>
              ) { }

  articleForm!: FormGroup;
  actionBtn: string = 'Save';
  header: string = 'Add Article';
  editData: boolean = false;
  formEdit: Boolean = false;
  articles$!: Subscription;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogForm', { static: true }) 
  dialogForm!: TemplateRef<any>;

  listArticles!: Articles2[];

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'shortDescription', 'longDescription', 'action'];

  getArticleForm(){
    console.log('trigger');
    this.articleForm = this.formBuilder.group({
      id:  new FormControl(""),
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
    })
  }

  openDialog(){
    this.getArticleForm();
    this.dialog.open(this.dialogForm, {});
  }

  onEditArticle(row: any){
    console.log(row);
    this.formEdit = true;
    this.store.dispatch(ArticleActions.loadSelectedArticleRequestedAction({id: row.id}));
    
  }

  applyEvent(event: any){
    console.log(event.key);
    const filterValue = event.key;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   submitForm(){
    
    if(!this.formEdit){
      var value = this.articleForm.value;
      const data = {
        title: value.title,
        short_description: value.shortDescription,
        long_description: value.longDescription
      };

      this.store.dispatch(ArticleActions.addArticleRequestedAction({payload: data}));
      this.dialog.closeAll();
      this.articleForm.reset();
      this.articleForm.setErrors(null);
      
    }else{
      var value = this.articleForm.value;
      const data = {
        id: value.id,
        title: value.title,
        short_description: value.shortDescription,
        long_description: value.longDescription
      };
      this.store.dispatch(ArticleActions.updateArticleRequestedAction({payload: {articleId: data.id, updateArticleDTO: data }}));
      this.dialog.closeAll();
      this.articleForm.reset();
      this.articleForm.setErrors(null);
      this.formEdit = false;
    }
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
      
      this.dataSource = res.articles;
      if(this.formEdit){
        if(Object.keys(res.selected_article).length !== 0){
         
          this.dialog.open(this.dialogForm, {});
          this.articleForm = this.formBuilder.group({
            id:  new FormControl(res.selected_article.id),
            title:  new FormControl(res.selected_article.title, Validators.required),
            shortDescription: new FormControl(res.selected_article.short_description, Validators.required),
            longDescription: new FormControl(res.selected_article.long_description, Validators.required),
          });
        }
      }
    });

    this.dataSource.paginator = this.paginator;
  }
}
 

