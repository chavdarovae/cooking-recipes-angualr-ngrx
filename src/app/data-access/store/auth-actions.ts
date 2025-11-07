import { IBackendErrors, ICreateUser, ILoginUser, IUser } from '@app/utils';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
    source: 'authActions',
    events: {
        register: props<{ request: ICreateUser }>(),
        registerSuccess: props<{ request: IUser }>(),
        registerFailure: props<{ errors: IBackendErrors }>(),

        login: props<{ request: ILoginUser }>(),
        loginSuccess: props<{ request: IUser }>(),
        loginFailure: props<{ errors: IBackendErrors }>(),

        getOwnAccount: emptyProps(),
        getOwnAccountSuccess: props<{ request: IUser }>(),
        getOwnAccountFailure: props<{ errors: IBackendErrors }>(),

        logout: emptyProps(),
        logoutSuccess: emptyProps(),
        logoutFailure: props<{ errors: IBackendErrors }>(),
    },
});
