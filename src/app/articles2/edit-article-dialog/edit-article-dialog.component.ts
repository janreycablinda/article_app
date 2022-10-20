import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articles2Service } from '../articles2.service';

@Component({
  selector: 'app-edit-article-dialog',
  templateUrl: './edit-article-dialog.component.html',
  styleUrls: ['./edit-article-dialog.component.scss']
})
export class EditArticleDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<EditArticleDialogComponent>,
              private formBuilder: FormBuilder,
              private artices2Service: Articles2Service) { }

  editArticleForm!: FormGroup;

  getEditArticleForm(){
    this.editArticleForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
    })
    if(this.editData){
      this.editArticleForm.controls['title'].setValue(this.editData.title)
      this.editArticleForm.controls['shortDescription'].setValue(this.editData.shortDescription)
      this.editArticleForm.controls['longDescription'].setValue(this.editData.longDescription)
    }
  }

  updateArticle(){
    this.artices2Service.updateArticle(this.editArticleForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        this.dialogRef.close('update')
      },
      error: () => {

      }
    })
  }

  ngOnInit(): void {
    this.getEditArticleForm();
  }

}
