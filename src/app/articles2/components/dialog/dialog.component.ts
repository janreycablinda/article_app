import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Articles2Action from '../../../store/articles2/articles2.actions'

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Articles2 } from 'src/app/store/articles2.state';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  articleForm!: FormGroup;
  actionBtn: string = 'Save';
  header: string = 'Add Article';
  articles2!: Articles2[]

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<DialogComponent>,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private store: Store<{articles2: [any]}> ) { }

  getArticleForm(){
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
    })
    if(this.editData){
      this.header = 'Edit Article'
      this.actionBtn = 'Update';
      this.articleForm.controls['title'].setValue(this.editData.title)
      this.articleForm.controls['shortDescription'].setValue(this.editData.shortDescription)
      this.articleForm.controls['longDescription'].setValue(this.editData.longDescription)
    }
  }
  
  addArticle(){
    if(!this.editData){
       if(this.articleForm.valid){
        const data = {
          title: this.articleForm.value.title,
          shortDescription: this.articleForm.value.shortDescription,
          longDescription: this.articleForm.value.longDescription
        }
        this.store.dispatch(Articles2Action.addArticles2sRequested({ payload: data}))
        if(data){
          this.openSnackBar('Added Successfully!', 'Close')
          this.dialogRef.close()
        }else{
          return false;
        }
    }else{
      // this.updateArticle()
    } 
  }
}

  // updateArticle(){
  //   this.articles2Service.updateArticle(this.articleForm.value, this.editData.id)
  //   .subscribe({
  //     next: (res) => {
  //       this.openSnackBar('Updated Successfully!', 'Close')
  //       this.dialogRef.close('update')
  //     },
  //     error: (err) => {
  //       this.openSnackBar('Error while updating!', 'Close')
  //     }
  //   })
  // }

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
    this.getArticleForm();
  }
}

