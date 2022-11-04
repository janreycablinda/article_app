import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ArticleActions from '../../../store/articles/articles.actions'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialog: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<{ articles: [any] }>
  ) { }

  public Editor = ClassicEditor;

  articleForm!: FormGroup;
  actionBtn: string = 'Save';
  header: string = 'Add Article';

  getArticleForm(){
    this.articleForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
    })
    if(this.editData){
      this.header = 'Edit Article'
      this.actionBtn = 'Update';
      this.articleForm.controls['id'].setValue(this.editData.id)
      this.articleForm.controls['title'].setValue(this.editData.title)
      this.articleForm.controls['shortDescription'].setValue(this.editData.short_description)
      this.articleForm.controls['longDescription'].setValue(this.editData.long_description)
    }
  }

  submitForm(){
    if(!this.editData){
      var value = this.articleForm.value;
      const data = {
        title: value.title,
        short_description: value.shortDescription,
        long_description: value.longDescription
      };

      this.store.dispatch(ArticleActions.addArticleRequestedAction({payload: data}));
      this.dialog.close();
      
    }else{
      var value = this.articleForm.value;
      const data = {
        id: value.id,
        title: value.title,
        short_description: value.shortDescription,
        long_description: value.longDescription
      };
      this.store.dispatch(ArticleActions.updateArticleRequestedAction({payload: {articleId: data.id, updateArticleDTO: data }}));
      this.store.dispatch(ArticleActions.deSelectArticleAction());
      this.dialog.close();
    }
   }

  ngOnInit(): void {
    this.getArticleForm();
  }

}
