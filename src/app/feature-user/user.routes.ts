import { Routes } from '@angular/router';
import { AuthGuard } from '@app/data-access';

export const USER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./feature/user-list/user-list.component').then(
                (c) => c.UserListComponent,
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'create',
        loadComponent: () =>
            import('./feature/user-create/user-create.component').then(
                (c) => c.UserCreateComponent,
            ),
        canActivate: [AuthGuard],
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./feature/user-create/user-create.component').then(
                (c) => c.UserCreateComponent,
            ),
        canActivate: [AuthGuard],
    },
    {
        path: ':id/edit',
        loadComponent: () =>
            import('./feature/user-create/user-create.component').then(
                (c) => c.UserCreateComponent,
            ),
        canActivate: [AuthGuard],
    },
];
