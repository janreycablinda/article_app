import { Routes } from '@angular/router';

import { Articles2Component } from './articles2.component';

export const Articles2Routes: Routes = [
  {
    path: '',
    component: Articles2Component,
	data: {
      title: 'Articles2',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Articles2' }
      ]
    }
  }
];
