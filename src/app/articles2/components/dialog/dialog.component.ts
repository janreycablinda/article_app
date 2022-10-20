import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articles2Service } from '../../articles2.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<DialogComponent>,
              private formBuilder: FormBuilder,
              private articles2Service: Articles2Service) { }

  articleForm!: FormGroup;
  actionBtn: string = 'Save';
  header: string = 'Add Article';

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
      this.articles2Service.postArticle(this.articleForm.value)
      .subscribe({
        next: (res) => {
          console.log(this.articleForm.value)
          alert("Added Successfully!")
        },
        error: () => {
          alert("Error while adding!")
          }
        })
      }
    }else{
      this.updateArticle()
    }
  }

  updateArticle(){
    this.articles2Service.updateArticle(this.articleForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Updated Successfully!")
        this.dialogRef.close('update')
      },
      error: () => {
        alert("Error while updating!")
      }
    })
  }

  ngOnInit(): void {
    this.getArticleForm();
  }

}
