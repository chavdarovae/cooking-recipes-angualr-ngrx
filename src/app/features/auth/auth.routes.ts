import { Routes } from '@angular/router';
import { RegisterComponent } from './features/register-component/register-component';
import { LoginComponent } from './login-component/login-component';

export const AUTH_ROUTS: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
];
