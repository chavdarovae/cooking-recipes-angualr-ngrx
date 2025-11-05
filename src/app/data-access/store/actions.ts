import { IBackendErrors, ICreateUser, IUser } from '@app/utils';
import { createActionGroup, props } from '@ngrx/store';

export const authActions = createActionGroup({
    source: 'authActions',
    events: {
        register: props<{ request: ICreateUser }>(),
        registerSuccess: props<{ request: IUser }>(),
        registerFailure: props<{ errors: IBackendErrors }>(),
    },
});
