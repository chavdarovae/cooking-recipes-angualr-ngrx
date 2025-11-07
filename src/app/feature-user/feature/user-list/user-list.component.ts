import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { InputFieldComponent, InputSelectComponent } from '@app/ui';
import { UserRolesEnum } from '@app/utils';
import { combineLatest, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { UserQuery } from '@app/feature-user/utils/user.models';
import {
    selectIsLoading,
    selectUserList,
    selectValidatonErrors,
} from '../../store/user-reducers';
import { userActions } from '@app/feature-user/store/user-actions';

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    imports: [RouterLink, InputFieldComponent, InputSelectComponent, AsyncPipe],
    providers: [NgForm],
})
export class UserListComponent implements OnInit {
    private store = inject(Store);

    // auxiliary variables
    query!: UserQuery;
    userRolesEnum = UserRolesEnum;

    data$ = combineLatest({
        userList: this.store.select(selectUserList),
        isLoading: this.store.select(selectIsLoading),
        backendErrors: this.store.select(selectValidatonErrors),
    });

    ngOnInit(): void {
        this.query = new UserQuery('');
        const query = { ...this.query };
        this.store.dispatch(userActions.getAllUsers({ query }));
    }

    onSearchQueryChange() {
        const query = { ...this.query };
        this.store.dispatch(userActions.getAllUsers({ query }));
    }
}
