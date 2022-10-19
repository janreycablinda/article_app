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
import { CdkTableModule } from '@angular/cdk/table';
import { EditComponent } from './components/edit/edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { DeleteComponent } from './components/delete/delete.component';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(ArticlesRoutes),
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    
  ],
  declarations: [
    ArticlesComponent,
    EditComponent,
    DeleteComponent,
  ],
  bootstrap:[
    ArticlesComponent
  ]
})
export class ArticlesModule {}
