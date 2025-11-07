import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./feature/user-list/user-list.component').then(
                (c) => c.UserListComponent,
            ),
    },
    // {
    //     path: ':id',
    //     loadComponent: () =>
    //         import('./user-edit/user-edit.component').then(
    //             (c) => c.UserEditComponent,
    //         ),
    //     canActivate: [AuthGuard],
    // },
];
