import { Injectable } from '@angular/core';
import { ELEMENT_DATA } from './articles.model';
import { Element } from './articles.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }
  article!:Element;
  

  deleteArticle() {
    const index: number = ELEMENT_DATA.indexOf(this.article);
    if (index !== -1) {
       ELEMENT_DATA.splice(index, 1);
    } 
    // ArticlesComponent.fetchData();  
    console.log("delete article excecuted")     
  }

}


