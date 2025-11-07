import { USER_ROUTES } from './feature-user/utils/users.routes';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full',
    },
    {
        path: '',
        loadChildren: () => import('@feature-auth').then((m) => m.AUTH_ROUTES),
    },
    {
        path: 'users',
        loadChildren: () => import('@feature-user').then((m) => m.USER_ROUTES),
    },
    {
        path: 'recipes',
        loadChildren: () =>
            import('@feature-recipe').then((m) => m.RECIPE_ROUTES),
    },
    {
        path: '404',
        loadComponent: () =>
            import('@data-access').then((c) => c.PageNotFoundComponent),
    },
    {
        path: '**',
        redirectTo: '/404',
        pathMatch: 'full',
    },
];
