import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArticlesRoutes } from './articles.routing';
import { ArticlesComponent } from '../articles/articles.component';
// import { BasicTableComponent } from './basic-table/basic-table.component';
// import {MatTableDataSource, MatTableModule} from '@angular/material';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule} from '@angular/cdk/table';
// import {DataSource} from '@angular/cdk/table';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(ArticlesRoutes),
    // MatTableDataSource,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatTableModule,
    
  ],
  declarations: [
    ArticlesComponent,
    // MatTableDataSource,
    
   
  ]
})
export class ArticlesModule {}
