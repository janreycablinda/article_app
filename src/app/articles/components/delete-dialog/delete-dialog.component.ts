// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-delete-dialog',
//   templateUrl: './delete-dialog.component.html',
//   styleUrls: ['./delete-dialog.component.scss']
// })
// export class DeleteDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ELEMENT_DATA } from '../../articles.model';
// import { Element } from '../../articles.model';
// import { ArticlesComponent } from '../../articles.component';
import { ArticlesService } from '../../articles.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public articlesService: ArticlesService) {}

  ngOnInit(): void {
  }

  deleteArticle(){
    this.articlesService.delete(this.articlesService.articleID).subscribe((response)=>{
      console.log("delete resposne ===== ", response, "=========");
      // window.alert(`${this.articlesService.article.title} article is deleted sucessfully`)
    });
  };     
}
