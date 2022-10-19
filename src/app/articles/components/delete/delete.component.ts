import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ELEMENT_DATA } from '../../articles.model';
// import { Element } from '../../articles.model';
// import { ArticlesComponent } from '../../articles.component';
import { ArticlesService } from '../../articles.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    public articlesService: ArticlesService) {}

  ngOnInit(): void {
  }

  deleteArticle = () => this.articlesService.deleteArticle();     
  

}
