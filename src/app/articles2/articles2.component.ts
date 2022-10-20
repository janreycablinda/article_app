import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Articles2 } from './articles2.model';
import { MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { Articles2Service } from './articles2.service';

@Component({
  selector: 'app-articles2',
  templateUrl: './articles2.component.html',
  styleUrls: ['./articles2.component.scss']
})
export class Articles2Component implements OnInit {

  constructor(private dialog: MatDialog,
              private articles2Service: Articles2Service) { }

  listArticles!: Articles2[];

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'shortDescription', 'longDescription', 'action'];

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

  openDialog(){
    this.dialog.open(DialogComponent,{})
  }

  editArticle(row: any){
    this.dialog.open(DialogComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllArticle()
      }
    })
  }

  ngOnInit(): void {
    this.getAllArticle();
  }

}
 

