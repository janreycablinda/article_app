import { Component, OnInit, ViewChild } from '@angular/core';

import { Articles2Service } from './articles2.service';
import { Articles2 } from './articles2.model';
import { DialogComponent } from './components/dialog/dialog.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-articles2',
  templateUrl: './articles2.component.html',
  styleUrls: ['./articles2.component.scss']
})
export class Articles2Component implements OnInit {

  constructor(private dialog: MatDialog,
              private articles2Service: Articles2Service,
              private snackBar: MatSnackBar) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listArticles!: Articles2[];

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'shortDescription', 'longDescription', 'action'];

  getAllArticle(){
    this.articles2Service.getArticle()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
          this.openSnackBar('Deleted Successfully!', 'Close')
        },
        error : (err) => {
          this.openSnackBar('Error while deleting!', 'Close')
        }
      })
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

  applyEvent(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {
       horizontalPosition: 'center',
       verticalPosition: 'top',
       duration: 5000
     })
 
     // snackBarRef.afterDismissed().subscribe(() => {
     //   window.location.reload()
     // })
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
 

