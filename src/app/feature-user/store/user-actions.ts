import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IBackendErrors, ICreateUser, IUser } from '@app/utils';
import { IUserQuery } from '../utils/user.interfaces';
import { UserCreateItem, UserEditItem } from '../utils/user.models';

export const userActions = createActionGroup({
    source: 'userActions',
    events: {
        getAllUsers: props<{ query: IUserQuery }>(),
        getAllUsersSuccess: props<{ userList: IUser[] }>(),
        getAllUsersFailure: props<{ errors: IBackendErrors }>(),

        getUserById: props<{ userId: string }>(),
        getUserByIdSuccess: props<{ user: IUser }>(),
        getUserByIdFailure: props<{ errors: IBackendErrors }>(),

        updateUserById: props<{ user: UserEditItem }>(),
        updateUserByIdSuccess: props<{ user: IUser }>(),
        updateUserByIdFailure: props<{ errors: IBackendErrors }>(),

        createUser: props<{ user: UserCreateItem }>(),
        createUserSuccess: props<{ user: IUser }>(),
        createUserFailure: props<{ errors: IBackendErrors }>(),

        deleteUser: props<{ userId: string }>(),
        deleteUserSuccess: emptyProps(),
        deleteUserFailure: props<{ errors: IBackendErrors }>(),
    },
});
