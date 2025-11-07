import { Routes } from '@angular/router';
import {
    userFeatureKey,
    userReducer,
} from './feature-user/store/user-reducers';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as userEffects from './feature-user/store/user-effects';

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
        providers: [
            provideState(userFeatureKey, userReducer),
            provideEffects(userEffects),
        ],
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
