import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Articles2 } from './articles2.model';
import { MatDialog} from '@angular/material/dialog';
import { EditArticleDialogComponent } from './edit-article-dialog/edit-article-dialog.component';
import { Articles2Service } from './articles2.service';

@Component({
  selector: 'app-articles2',
  templateUrl: './articles2.component.html',
  styleUrls: ['./articles2.component.scss']
})
export class Articles2Component implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private editDialog: MatDialog,
              private articles2Service: Articles2Service) { }

  listArticles!: Articles2[];

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'shortDescription', 'longDescription', 'action'];

  articleForm!: FormGroup

  getArticleForm(){
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required]
    })
  }

  getAllArticle(){
    this.articles2Service.getArticle()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: () => {

      }
    })
  }

  addArticle(){
    if(this.articleForm.valid){
      this.articles2Service.postArticle(this.articleForm.value)
      .subscribe({
        next: (res) => {
          console.log(this.articleForm.value)
          alert("Added Successfully!")
        },
        error: () => {
          alert("Error!")
        }
      })
    }
  }

  deleteArticle(id: number){
      this.articles2Service.deleteArticle(id)
      .subscribe({
        next:(res) => {
          console.log(res)
        },
        error : () => {
        }
      })
  }

  updateArticle(row: any){
    this.editDialog.open(EditArticleDialogComponent,{
      data: row
    }).afterClosed().subscribe((val) => {
      if(val === 'update'){
        this.getAllArticle()
      }
    })
  }

  ngOnInit(): void {
    this.getArticleForm();
    this.getAllArticle();
  }

}
 

