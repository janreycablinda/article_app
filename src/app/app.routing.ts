import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { ArticleResolverService } from './store/articles/article-resolver.service';
import { AuthGuard } from './store/auth/auth.guard';


export const AppRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'articles',
                loadChildren: () => import('./articles2/articles.module').then(m => m.ArticlesModule),
                resolve: {
                    articlesResolver: ArticleResolverService
                }
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                resolve: {
                    articlesResolver: ArticleResolverService
                }
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];
