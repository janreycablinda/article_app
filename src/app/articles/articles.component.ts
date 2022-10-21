import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from './articles.model';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { ArticlesService } from './articles.service';
import { ELEMENT_DATA, lastAddedID } from './articles.model';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavigationStart, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
 
  // private subscription: Subscription;
  action: string = "add";
  updatedArticle!: Element;
  displayedColumns = ['id', 'title', 'shortDescription', 'longDescription', 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  _articleForm!: FormGroup;
  submitted = false; 
  lastID =  0;
  message: any="";
  fetch?: Subscription;
  create?: Subscription;
  update?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public articlesService: ArticlesService,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) {
      // this.subscription = articlesService.getMessage().subscribe(message => {
      //   this.message = message;
      // });
    }

  ngOnInit(): void {
    this.fetchData();
    this.articleForm({
      title:"",
      shortDescription: "",
      longDescription: "",
      
    });
  }

  // ngOnDestroy(): void {
  //   this.fetch?.unsubscribe;
  //   this.create?.unsubscribe;
  //   this.update?.unsubscribe;
  // }

  articleForm(data: Element){
    this._articleForm = this.formBuilder.group({
      title:  new FormControl(data.title, Validators.required),
      shortDescription: new FormControl(data.shortDescription, Validators.required),
      longDescription: new FormControl(data.longDescription, Validators.required),
      // title:  new FormControl(""),
      // shortDescription: new FormControl(""),
      // longDescription: new FormControl(""),
     });
  }


  openEditDialog(id: string, article: Element){
    // this.articleID = id
    this.articlesService.articleID = id;
    this.articlesService.article = article;
    this.action = "update"
    this.articleForm(article);
  }

  editFunction(){
    console.log("on update excecuted")
   
    var value = this._articleForm.value;
    // var update = this.updatedArticle
    // let index = ELEMENT_DATA.indexOf(update);
    // ELEMENT_DATA[index] = {
    //   title: value.title,
    //   shortDescription: value.shortDescription,
    //   longDescription: value.longDescription,
    // };
    this.articlesService.update(this.articlesService.articleID, value).subscribe((response)=>{
      console.log("Update response ========= ", response, " ==========")
    })
    this.fetchData();
    this.action = "add";
    this._articleForm.reset();
    this._articleForm.setErrors(null);
  }
 
  onAddArticle(){
    var value = this._articleForm.value;
    if(this._articleForm.valid){
      console.log("============= ADDED ==========")
      // this.create = 
      this.articlesService.createArticle(value).subscribe((response)=>{
        console.log("add resposne ===== ", response, "======")
        this.openSnackBar("Added Successfully");
      });
      // this.openSnackBar("Added Successfully");
    }
    this.fetchData();
    this.submitted = false;
    this._articleForm.reset();
    this._articleForm.setErrors(null);
    
  }

  fetchData(): void{
    this.fetch = this.articlesService.getAll().subscribe((response)=>{
      console.log(response);
      this.dataSource = new MatTableDataSource<Element>(response);
    });
  }

  deleteArticle(articleID: string) {
    var deleteDialog = this.dialog.open(DeleteDialogComponent, {width: '300px'});
    this.articlesService.articleID = articleID;
    deleteDialog.afterClosed().subscribe(result => {
      this.fetchData();
      
    });
    
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, 'Great', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }
  
//   ngOnDestroy(): void {
//     // unsubscribe on destroy to prevent memory leaks
//     this.subscription.unsubscribe();
//   }
//   closeMessage() {
//     this.articlesService.clearAlertMessage();    
  
// }

}










// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-articles',
//   templateUrl: './articles.component.html',
//   styleUrls: ['./articles.component.scss']
// })
// export class ArticlesComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
