import { userActions } from './user-actions';

import { createFeature, createReducer, on } from '@ngrx/store';
import { IUserState } from '../utils/user.interfaces';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: IUserState = {
    isLoading: false,
    validatonErrors: null,
    userList: null,
};

const userFeature = createFeature({
    name: 'user',
    reducer: createReducer(
        initialState,
        on(userActions.getAllUsers, (state) => ({
            ...state,
            isLoading: true,
        })),

        on(userActions.getAllUsersSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            userList: action.userList,
        })),
        on(userActions.getAllUsersFailure, (state, action) => ({
            ...state,
            validatonErrors: action.errors,
        })),
        on(routerNavigatedAction, () => initialState),
    ),
});

export const {
    name: userFeatureKey,
    reducer: userReducer,
    selectIsLoading,
    selectUserList,
    selectValidatonErrors,
} = userFeature;
