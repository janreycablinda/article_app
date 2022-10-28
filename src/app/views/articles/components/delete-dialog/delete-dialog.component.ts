import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  ngOnInit(): void {}

  deleteArticle(){
    var id = this.articlesService.articleID;
    this.articlesService.delete(id).subscribe((response)=>{
      console.log("Delete resposne ", response)
      this.articlesService.warningAlertMessage(`${this.articlesService.article.title} deleted sucessfully.`)
      
    });
  };     
}
