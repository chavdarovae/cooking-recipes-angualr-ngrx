import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputFieldComponent, InputSelectComponent } from '@app/ui';
import { IUser, UserRolesEnum } from '@app/utils';
import {
    UserCreateItem,
    UserEditItem,
} from '@app/feature-user/utils/user.models';
import { combineLatest, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '@app/feature-user/store/user-reducers';
import { userActions } from '@app/feature-user/store/user-actions';

type UserUserInteractionType = 'update' | 'create';

@Component({
    selector: 'app-user-create',
    standalone: true,
    templateUrl: './user-create.component.html',
    styleUrl: './user-create.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputFieldComponent,
        InputSelectComponent,
    ],
})
export class UserCreateComponent implements OnInit {
    private store = inject(Store);

    @Input() id!: string; // implicit input from routing

    // main entity
    currUser!: UserCreateItem | UserEditItem;
    allowedAction!: UserUserInteractionType;
    userRolesEnum = UserRolesEnum;

    data$ = combineLatest({
        user: this.store.select(selectUser),
    }).pipe(
        tap((data: { user: IUser | null }) => {
            this.currUser = data?.user
                ? new UserEditItem(data.user)
                : new UserCreateItem();
            this.allowedAction = (this.currUser as UserEditItem)?._id
                ? 'update'
                : 'create';
        }),
    );

    ngOnInit(): void {
        this.store.dispatch(userActions.getUserById({ userId: this.id }));
    }

    onSubmit(action: UserUserInteractionType) {
        const user = { ...this.currUser };
        switch (action) {
            case 'create':
                this.store.dispatch(
                    userActions.createUser({ user: user as UserCreateItem }),
                );
                break;
            case 'update':
                this.store.dispatch(
                    userActions.updateUserById({ user: user as UserEditItem }),
                );
                break;
        }
    }
}
