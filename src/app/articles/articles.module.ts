// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ArticlesComponent } from './articles.component';
// import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';



// @NgModule({
//   declarations: [
//     ArticlesComponent,
//     DeleteDialogComponent,
//   ],
//   imports: [
//     CommonModule
//   ]
// })
// export class ArticlesModule { }


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
import { MatDialogModule } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { AlertComponent } from './components/alert/alert.component';



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
    AlertComponent,
  ],
  bootstrap:[
    ArticlesComponent
  ]
})
export class ArticlesModule {}