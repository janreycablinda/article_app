import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'articles',
                loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
            },
            {
                path: 'articles2',
                loadChildren: () => import('./articles2/articles2.module').then(m => m.Articles2Module)
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
];
