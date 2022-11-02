import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { Articles2 } from '../store/articles2.state';
import { DialogComponent } from './components/dialog/dialog.component';
import * as Articles2Action from '../store/articles2/articles2.actions'

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-articles2',
  templateUrl: './articles2.component.html',
  styleUrls: ['./articles2.component.scss']
})
export class Articles2Component implements OnInit {
  articles2!: Articles2[];
  dataSource!: any;
  displayedColumns: string[] = ['id', 'name', 'image_link', 'description', 'price', 'action'];
  articles2$!: Observable<any>;

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store<{ articles2: [any] }>) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getAllArticle() {
    this.store.dispatch(Articles2Action.loadArticles2sRequested())
    this.articles2$ = this.store.select('articles2');
    this.articles2$.subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.openSnackBar('Error while fetching the data!', 'Close')
      }
    });

  }

  deleteArticle(id: number) {
    let del = window.confirm("Are you sure you want to delete this article?")
    if (del && id) {
      this.store.dispatch(Articles2Action.deleteArticles2sRequested({ id: id }))
      // if (id) {
      //   this.articles2Service.fetchArticles().subscribe({
      //     next: (res) => {
      //       console.log("deleted", res.articles2)
      //       this.openSnackBar('Deleted Successfully!', 'Close')
      //     },
      //     error: (err) => {
      //       this.openSnackBar('Error while deleting!', 'Close')
      //     }
      //   })
      // }
    } else {
      return false;
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {})
  }

  editArticle(row: any) {
    this.dialog.open(DialogComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllArticle()
      }
    })
  }

  applyEvent(event: Event) {
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
    this.getAllArticle()
    // this.articles2Service.fetchArticles().subscribe({
    //   next: (res) => {
    //     this.getAllArticle()
    //   }
    // })
  }
}


