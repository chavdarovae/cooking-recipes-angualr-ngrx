import { createActionGroup, props } from '@ngrx/store';
import { IUserQuery } from '../utils/user.interfaces';
import { IBackendErrors, IUser } from '@app/utils';

export const userActions = createActionGroup({
    source: 'userActions',
    events: {
        getAllUsers: props<{ query: IUserQuery }>(),
        getAllUsersSuccess: props<{ userList: IUser[] }>(),
        getAllUsersFailure: props<{ errors: IBackendErrors }>(),
    },
});
