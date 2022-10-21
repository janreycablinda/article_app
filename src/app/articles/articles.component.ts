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
import { AlertComponent } from './components/alert/alert.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
 
  private subscription: Subscription;
  fetch?: Subscription;
  create?: Subscription;
  update?: Subscription;
  delete?: Subscription;
  action: string = "add";
  updatedArticle!: Element;
  displayedColumns = ['id', 'title', 'description', 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  _articleForm!: FormGroup;
  submitted = false; 
  lastID =  0;
  message: any="";


  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public articlesService: ArticlesService,
    private http: HttpClient,
    private router: Router) {
      this.subscription = articlesService.getMessage().subscribe(message => {
        this.message = message;
      });
    }

  ngOnInit(): void {
    this.fetchData();
    this.articleForm({
      title:"",
      shortDescription: "",
      longDescription: "",
      
    });
  }

  ngOnDestroy(): void {
    this.fetch?.unsubscribe;
    this.create?.unsubscribe;
    this.update?.unsubscribe;
    this.subscription.unsubscribe();
    this.delete?.unsubscribe();
  }

  articleForm(data: Element){
    this._articleForm = this.formBuilder.group({
      title:  new FormControl(data.title, Validators.required),
      shortDescription: new FormControl(data.shortDescription, Validators.required),
      longDescription: new FormControl(data.longDescription, Validators.required),
     });
  }


  openEditDialog(id: string, article: Element){
    this.articlesService.articleID = id;
    this.articlesService.article = article;
    this.action = "update"
    this.articleForm(article);
  }

  editFunction(){
    var value = this._articleForm.value;
    this.articlesService.update(this.articlesService.articleID, value).subscribe((response)=>console.log("Update response", response));
    this.articlesService.successAlertMessage(`${value.title} Added Successfuly. `)
    this.fetchData();
    this.action = "add";
    this._articleForm.reset();
    this._articleForm.setErrors(null);
  }
 
  onAddArticle(){
    var value = this._articleForm.value;
    var service = this.articlesService;
    if(this._articleForm.valid){
      service.createArticle(value).subscribe((response)=>console.log("OnAdd Response",response));
      // window.location.reload();
      service.successAlertMessage(`"${value.title}" Added successfuly.`);
      
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

  deleteArticle(articleID: string, article: Element) {
    var deleteDialog = this.dialog.open(DeleteDialogComponent, {width: '300px'});
    this.articlesService.articleID = articleID;
    this.articlesService.article = article;
    deleteDialog.afterClosed().subscribe(() =>this.fetchData());
  }

  onCancelUpdate(){
    this.action = "add";
    location.reload();
  }

  // getSuccessMessage(textMessage: string = "Success") {
  //   this.articlesService.success(textMessage);
  // }
  // getWarningMessage() {
  //   this.articlesService.warning("Oh !!!! Plz check double");
  // }
  // getErrorMessage() {
  //   this.articlesService.error("Ooopss !!!! Something went wrong");
  // }
  // getInfoMessage() {
  //   this.articlesService.info("Yepp !!! This is a important information");
  // }
  // clearMessage() {
  //   this.articlesService.clearAlertMessage();
  // }

}




