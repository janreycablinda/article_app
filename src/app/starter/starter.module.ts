import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import { ArticlesComponent } from '../articles/articles.component';
// import { BasicTableComponent } from './basic-table/basic-table.component';
// import {MatTableDataSource, MatTableModule} from '@angular/material';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes),
    // MatTableDataSource,
    
  ],
  declarations: [
    StarterComponent
    // MatTableDataSource,
  ]
})
export class StarterModule {}
