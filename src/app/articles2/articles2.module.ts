import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Articles2Routes } from './articles2.routing';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule} from '@angular/cdk/table';
import { DemoMaterialModule } from '../demo-material-module';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';



import { Articles2Component } from './articles2.component';
import { EditArticleDialogComponent } from './edit-article-dialog/edit-article-dialog.component';


@NgModule({
  declarations: [Articles2Component, EditArticleDialogComponent, ],

  imports: [
    CommonModule,
    RouterModule.forChild(Articles2Routes),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    FlexLayoutModule,
    CdkTableModule,
    DemoMaterialModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class Articles2Module {}
