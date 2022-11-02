import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Articles2Action from '../../../store/articles2/articles2.actions'
import { Articles2 } from 'src/app/store/articles2.state';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  articles2!: Articles2[]
  articleForm!: FormGroup;
  articles2$!: Observable<any>
  actionBtn: string = 'Save';
  header: string = 'Add Article';

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<{ articles2: [any] }>) { }

  getArticleForm() {
    this.articleForm = this.formBuilder.group({
      name: ['', Validators.required],
      image_link: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      is_published: ['', Validators.required]
    })
    if (this.editData) {
      this.header = 'Edit Article'
      this.actionBtn = 'Update';
      this.articleForm.controls['name'].setValue(this.editData.name)
      this.articleForm.controls['image_link'].setValue(this.editData.image_link)
      this.articleForm.controls['description'].setValue(this.editData.description)
      this.articleForm.controls['price'].setValue(this.editData.price)
      this.articleForm.controls['is_published'].setValue(this.editData.is_published)
    }
  }

  addArticle() {
    if (!this.editData && this.articleForm.valid) {
      const data = {
        name: this.articleForm.value.name,
        image_link: this.articleForm.value.image_link,
        description: this.articleForm.value.description,
        price: this.articleForm.value.price,
      }
      this.store.dispatch(Articles2Action.addArticles2sRequested({ payload: data }))
      // if (data) {
      //   this.articles2Service.fetchArticles().subscribe({
      //     next: (res) => {
      //       console.log("added", res.articles2)
      //       this.openSnackBar('Added Successfully!', 'Close')
      //       this.dialogRef.close()
      //     },
      //     error: (err) => {

      //     }
      //   })
      // } else {
      //   return false;
      // }
    } else {
      this.updateArticle()
    }
  }

  updateArticle() {
    const data = {
      name: this.articleForm.value.name,
      image_link: this.articleForm.value.image_link,
      description: this.articleForm.value.description,
      price: this.articleForm.value.price,
      is_published: this.articleForm.value.is_published
    }
    const getArticleId = this.editData.id
    this.store.dispatch(Articles2Action.updateArticles2sRequested({ payload: { articleId: getArticleId, updateArticle: data } }))
    this.articles2$ = this.store.select('articles2')
    this.articles2$.subscribe({
      next: (res) => {
        this.dialogRef.close('update')
      }
    })

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
    this.getArticleForm();
  }
}

