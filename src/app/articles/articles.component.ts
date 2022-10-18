import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from './articles.model';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this. articleForm();
  }

  displayedColumns = ['id', 'title', 'shortDescription', 'longDescription'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  _articleForm!: FormGroup; 

  articleForm(){
    this._articleForm = this.formBuilder.group({
      title:  new FormControl(""),
      shortDescription: new FormControl(""),
      longDescription: new FormControl(""),
     });
  }
  
 
  onAddArticle(){
    console.log(this._articleForm.value); 
    var value = this._articleForm.value;
    ELEMENT_DATA.push({
      id: ELEMENT_DATA.length+1,
      title: value.title,
      shortDescription: value.shortDescription,
      longDescription: value.longDescription,
    });
    this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    this._articleForm.reset();
    this._articleForm.setErrors(null);
  }

}


const ELEMENT_DATA: Element[] = [
  // { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  // { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  // { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  // { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  // { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  // { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  // { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  // { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  // { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  // { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  // { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  // { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  // { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  // { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  // { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  // { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  // { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  // { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  // { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  // { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
