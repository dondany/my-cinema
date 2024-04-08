import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        loadComponent: () => import('./news/news.component'),
      },
    ],
  },
];
