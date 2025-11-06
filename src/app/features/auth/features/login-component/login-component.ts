import { AuthService } from './../../../../data-access/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    authActions,
    selectCurrentUser,
    selectIsSubmitting,
    selectValidatonErrors,
} from '@app/data-access';
import { InputFieldComponent } from '@app/ui';
import { ILoginUser } from '@app/utils';
import { Store } from '@ngrx/store';
import { combineLatest, tap } from 'rxjs';

@Component({
    selector: 'rcp-login',
    imports: [CommonModule, FormsModule, RouterModule, InputFieldComponent],
    templateUrl: './login-component.html',
    styleUrl: './login-component.scss',
})
export class LoginComponent {
    private store = inject(Store);

    model: ILoginUser = {
        email: '',
        password: '',
    };

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidatonErrors),
        currUser: this.store.select(selectCurrentUser).pipe(),
    }).pipe(
        tap((data) => {
            console.log(data.currUser);
        }),
    );

    onSubmit() {
        if (!this.model.email || !this.model.password) {
            return;
        }

        const request: ILoginUser = {
            email: this.model.email,
            password: this.model.password,
        };
        this.store.dispatch(authActions.login({ request }));
    }
}
