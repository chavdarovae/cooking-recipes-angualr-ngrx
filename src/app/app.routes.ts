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
            import('./features/auth/index').then((m) => m.AUTH_ROUTS),
    },
];
