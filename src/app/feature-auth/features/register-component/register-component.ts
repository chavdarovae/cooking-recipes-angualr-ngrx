import { authActions } from '../../../data-access/store/actions';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    AuthService,
    selectIsSubmitting,
    selectValidatonErrors,
} from '@app/data-access';
import { InputFieldComponent } from '@app/ui';
import { ICreateUser } from '@app/utils';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'rcp-register-component',
    imports: [CommonModule, FormsModule, RouterModule, InputFieldComponent],
    templateUrl: './register-component.html',
    styleUrl: './register-component.scss',
})
export class RegisterComponent {
    private store = inject(Store);

    model = {
        username: '',
        email: '',
        password: '',
        rePassword: '',
    };

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidatonErrors),
    });

    onSubmit() {
        if (!this.model.email || !this.model.password || !this.model.username) {
            return;
        }

        const request: ICreateUser = {
            username: this.model.username,
            email: this.model.email,
            password: this.model.password,
        };

        this.store.dispatch(authActions.register({ request }));
    }
}
