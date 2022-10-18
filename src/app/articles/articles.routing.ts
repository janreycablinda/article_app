import { Routes } from '@angular/router';

import { ArticlesComponent } from './articles.component';

export const ArticlesRoutes: Routes = [
  // {
  //   path: '',
  //   component: StarterComponent,
	// data: {
  //     title: 'Starter Page',
  //     urls: [
  //       { title: 'Dashboard', url: '/dashboard' },
  //       { title: 'Starter Page' }
  //     ]
  //   }
  // },
  {
    path: '',
    component: ArticlesComponent,
	data: {
      title: 'Articles',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Articles' }
      ]
    }
  }
];
