import { Component, OnInit } from '@angular/core';

import { Articles2Service } from './articles2.service';
import { Articles2 } from './articles2.model';
import { DialogComponent } from './components/dialog/dialog.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';

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
    let del =  window.confirm("Are you sure you want to delete this article?")
    if(del) {
      this.articles2Service.deleteArticle(id)
      .subscribe({
        next:(res) => {
          console.log(res)
        },
        error : (err) => {
        }
      })
      window.location.reload()
    }else{
      return false;
    }
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
    this.articles2Service.autoFetchArticle().subscribe({
      next:(res) => {
        this.getAllArticle()
      },
      error : (err) => {
      }
    })
  }
}
 

