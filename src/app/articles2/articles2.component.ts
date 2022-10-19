import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Articles2 } from './articles2.model';
import { MatDialog} from '@angular/material/dialog';
import { EditArticleDialogComponent } from './edit-article-dialog/edit-article-dialog.component';

@Component({
  selector: 'app-articles2',
  templateUrl: './articles2.component.html',
  styleUrls: ['./articles2.component.scss']
})
export class Articles2Component implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private editDialog: MatDialog) { }

  listArticles!: Articles2[];

  dataSource: any;
  displayedColumns: string[] = ['id', 'title', 'shortDescription', 'longDescription', 'action'];

  articleForm!: FormGroup

  getArticleForm(){
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required]
    })
  }

  // fetchArticle(){
  //   this.dataSource = new MatTableDataSource<Articles2>(ARTICLE_DATA)
  // }

  // getArticle(){
  //   let articleData = [ARTICLE_DATA];
  //   console.log(articleData)
  // }

  onAddArticle(){
    console.log(this.articleForm.value)
    this.listArticles.push({
      id: this.listArticles.length+1,
      title: this.articleForm.value.title,
      shortDescription: this.articleForm.value.shortDescription,
      longDescription: this.articleForm.value.longDescription,
    })
    this.dataSource = new MatTableDataSource<Articles2>()
    console.log(this.dataSource)
  }

  deleteProduct(index: number, id: number){
    let data = [...this.listArticles]
    console.log(data)
    data.splice(index, 1)

  }

  updateArticle(row: any){
    this.editDialog.open(EditArticleDialogComponent,{
      data: row
    })
  }

  ngOnInit(): void {
    this.getArticleForm();
    // this.getArticle()
  }

}





