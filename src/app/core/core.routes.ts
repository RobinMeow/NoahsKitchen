import { Routes } from '@angular/router';

export const CORE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('src/app/core/home/home.component').then((c) => c.HomeComponent),
    title: 'missing translation',
  },
  // {
  //   path: 'signin',
  //   loadComponent: () =>
  //     import('src/app/sign-in/sign-in.component').then(
  //       (c) => c.SignInComponent
  //     ),
  //   title: 'Einloggen',
  // },
  // {
  //   path: 'signup',
  //   loadComponent: () =>
  //     import('src/app/sign-up/sign-up.component').then(
  //       (c) => c.SignUpComponent
  //     ),
  //   title: 'Registrieren',
  // },
  {
    path: '**',
    redirectTo: '',
  },
];

// lazy load children: https://youtu.be/c5f8Y2fzZM0?t=777
// https://angular.io/guide/lazy-loading-ngmodules#config-routes
