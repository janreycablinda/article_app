import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from './articles.model';
import { DeleteComponent } from './components/delete/delete.component';
import { ArticlesService } from './articles.service';
import { ELEMENT_DATA } from './articles.model';
import { element } from 'protractor';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
 
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public articlesService: ArticlesService) {}

  action: String = "add";
  updatedArticle!: Element;

  ngOnInit(): void {
    this.articleForm({
      id: 0,
      title:"",
      shortDescription: "",
      longDescription: "",
      action: "",
    });
  }

  displayedColumns = ['id', 'title', 'shortDescription', 'longDescription', 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  _articleForm!: FormGroup;
  submitted = false; 

  get f() { return this._articleForm.controls; }

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


  openEditDialog(article: Element){
    this.updatedArticle = article
    this.action = "update"
    this.articleForm(article);
  }

  editFunction(){
    console.log("on update excecuted")
    // let updateItem = ELEMENT_DATA.find(this.findIndexToUpdate(article), article.id);
    let index = ELEMENT_DATA.indexOf(this.updatedArticle);
    ELEMENT_DATA[index] = this._articleForm.value;
    this.fetchData();
    this.action = "add";
    this._articleForm.reset();
    this._articleForm.setErrors(null);
  }

  findIndexToUpdate(newItem:Element) { 
    return newItem.id;
  }
 
  onAddArticle(){
    console.log(this._articleForm.value); 
    var value = this._articleForm.value;
    this.submitted = true;
    
    if(this._articleForm.valid){  
      ELEMENT_DATA.push({
        id: ELEMENT_DATA.length+1,
        title: value.title,
        shortDescription: value.shortDescription,
        longDescription: value.longDescription,
        action: "action",
      });
    }

    this.fetchData();
    this.submitted = false;
    this._articleForm.reset();
    this._articleForm.setErrors(null);
  }

  fetchData(): void{
    this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  }

  deleteArticle(article:Element) {
    this.articlesService.article = article;
    var deleteDialog = this.dialog.open(DeleteComponent, {
      width: '300px',
    });
    deleteDialog.afterClosed().subscribe(result => {
      this.fetchData();  
    });
         
  }

}

