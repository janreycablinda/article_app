import { Routes } from '@angular/router';

// import { StarterComponent } from './starter.component';
import { ArticlesComponent } from '../articles/articles.component';

export const StarterRoutes: Routes = [
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
