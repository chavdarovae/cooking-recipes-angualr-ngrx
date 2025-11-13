import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
    InputFieldComponent,
    InputSelectComponent,
    ModalComponent,
} from '@app/ui';
import { IUser, UserRolesEnum } from '@app/utils';
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
    imports: [
        RouterLink,
        InputFieldComponent,
        InputSelectComponent,
        AsyncPipe,
        ModalComponent,
    ],
    providers: [NgForm],
})
export class UserListComponent implements OnInit {
    private store = inject(Store);

    data$ = combineLatest({
        userList: this.store.select(selectUserList),
        isLoading: this.store.select(selectIsLoading),
        backendErrors: this.store.select(selectValidatonErrors),
    });

    // auxiliary variables
    query!: UserQuery;
    userRolesEnum = UserRolesEnum;
    showModal!: boolean;
    currUser!: IUser;

    ngOnInit(): void {
        this.query = new UserQuery('');
        const query = { ...this.query };
        this.store.dispatch(userActions.getAllUsers({ query }));
    }

    onSearchQueryChange() {
        const query = { ...this.query };
        this.store.dispatch(userActions.getAllUsers({ query }));
    }

    showDeleteUserDialog(user: IUser) {
        this.currUser = user;
        this.showModal = true;
    }

    onModalClosed(confirmation: boolean) {
        this.showModal = false;
        if (confirmation && this.currUser) {
            this.store.dispatch(
                userActions.deleteUser({ userId: this.currUser._id }),
            );
        }
    }
}
