import { userActions } from './user-actions';

import { createFeature, createReducer, on } from '@ngrx/store';
import { IUserState } from '../utils/user.interfaces';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: IUserState = {
    isLoading: false,
    userList: null,
    user: null,
    validatonErrors: null,
};

const userFeature = createFeature({
    name: 'user',
    reducer: createReducer(
        initialState,
        // getAllUsers
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
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // getUserById
        on(userActions.getUserById, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(userActions.getUserByIdSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            user: action.user,
        })),
        on(userActions.getUserByIdFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // updateUserById
        on(userActions.updateUserById, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(userActions.updateUserByIdSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            user: action.user,
        })),
        on(userActions.updateUserByIdFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // createUser
        on(userActions.createUser, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(userActions.createUserSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            user: action.user,
        })),
        on(userActions.createUserFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // deleteUser
        on(userActions.deleteUser, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(userActions.deleteUserSuccess, (state) => ({
            ...state,
            isLoading: false,
            user: null,
        })),
        on(userActions.deleteUserFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),
        // navigation
        on(routerNavigatedAction, (state, action) => {
            const url = action.payload.routerState.url;
            const isUserEditRoute = url.endsWith('/edit');
            return {
                ...initialState,
                user: isUserEditRoute ? state.user : null,
            };
        }),
    ),
});

export const {
    name: userFeatureKey,
    reducer: userReducer,
    selectIsLoading,
    selectUserList,
    selectUser,
    selectValidatonErrors,
} = userFeature;
