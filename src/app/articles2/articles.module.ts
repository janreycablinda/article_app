import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticlesRoutes } from './articles.routing';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule} from '@angular/cdk/table';
import { DemoMaterialModule } from '../demo-material-module';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogComponent } from './components/dialog/dialog.component';
import { ArticlesComponent } from './articles.component';
import { QuillModule } from 'ngx-quill';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [ArticlesComponent, DialogComponent],

  imports: [
    CommonModule,
    RouterModule.forChild(ArticlesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    FlexLayoutModule,
    CdkTableModule,
    DemoMaterialModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    QuillModule.forRoot(),
    NgxSkeletonLoaderModule.forRoot()
  ]
})
export class ArticlesModule {}
