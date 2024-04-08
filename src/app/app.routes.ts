import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./feature/home/home.routes'),
  },
  {
    path: 'schedule',
    loadChildren: () => import('./feature/schedule/schedule.routes'),
  },
  {
    path: 'news',
    loadChildren: () => import('./feature/news/news.routes'),
  },
];
