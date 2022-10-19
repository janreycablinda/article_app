import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from './articles.model';
import { DeleteComponent } from './components/delete/delete.component';
import { ArticlesService } from './articles.service';
import { ELEMENT_DATA, lastAddedID } from './articles.model';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
 
  action: string = "add";
  updatedArticle!: Element;
  displayedColumns = ['id', 'title', 'shortDescription', 'longDescription', 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  _articleForm!: FormGroup;
  submitted = false; 
  lastID =  0;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articleForm({
      id: 0,
      title:"",
      shortDescription: "",
      longDescription: "",
      action: "",
    });
  }

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
    var value = this._articleForm.value;
    var update = this.updatedArticle
    let index = ELEMENT_DATA.indexOf(update);
    ELEMENT_DATA[index] = {
      id: update.id,
      title: value.title,
      shortDescription: value.shortDescription,
      longDescription: value.longDescription,
      action: this.action
    };
    this.fetchData();
    this.action = "add";
    this._articleForm.reset();
    this._articleForm.setErrors(null);
  }
 
  onAddArticle(){
    console.log(this._articleForm.value); 
    var value = this._articleForm.value;
    this.submitted = true;
    
    if(this._articleForm.valid){
      this.lastID +=1
      ELEMENT_DATA.push({
        id: this.lastID,
        title: value.title,
        shortDescription: value.shortDescription,
        longDescription: value.longDescription,
        action: "action" })}

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
    var deleteDialog = this.dialog.open(DeleteComponent, {width: '300px'});
    deleteDialog.afterClosed().subscribe(result => this.fetchData());
  }

}

