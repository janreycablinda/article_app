import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/articles',
                pathMatch: 'full'
            },
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'starter',
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
            },
            {
                path: 'articles',
                loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
            },

        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];
