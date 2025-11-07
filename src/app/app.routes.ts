import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/',
    //     pathMatch: 'full',
    // },
    {
        path: 'users',
        loadChildren: () =>
            import('@app/feature-auth').then((m) => m.AUTH_ROUTS),
    },
    {
        path: '404',
        loadComponent: () =>
            import('@app/data-access').then((c) => c.PageNotFoundComponent),
    },
    {
        path: '**',
        redirectTo: '/404',
        pathMatch: 'full',
    },
];
