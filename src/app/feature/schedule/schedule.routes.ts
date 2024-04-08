import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        loadComponent: () => import('./schedule/schedule.component'),
      },
    ],
  },
];
