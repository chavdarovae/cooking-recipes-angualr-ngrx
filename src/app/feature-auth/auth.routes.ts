import { Routes } from '@angular/router';
import { RegisterComponent } from './features/register-component/register-component';
import { LoginComponent } from './features/login-component/login-component';
import { LogoutComponent } from './features/logout-component/login-component';

export const AUTH_ROUTES: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'logout',
        component: LogoutComponent,
    },
];
