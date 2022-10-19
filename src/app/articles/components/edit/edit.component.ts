
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  _editArticleForm!: FormGroup; 
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private formBuilder: FormBuilder,
    ) {}

  ngOnInit(): void {
    this.editArticleForm();
  }

  editArticleForm(){
    this._editArticleForm = this.formBuilder.group({
      title:  new FormControl("title"),
      shortDescription: new FormControl("sdesc"),
      longDescription: new FormControl("ldesc"),
     });
  }
  onEditArticle(){
    
  }

}
