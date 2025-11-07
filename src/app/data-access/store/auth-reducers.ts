import { createFeature, createReducer, on } from '@ngrx/store';
import { IAuthStateInterface } from '../interfaces/auth-state-interface';
import { authActions } from './auth-actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initalState: IAuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: undefined,
    validatonErrors: null,
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initalState,
        on(authActions.register, (state) => ({
            ...state,
            isSubmitting: true,
            validatonErrors: null,
        })),
        on(authActions.registerSuccess, (state, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.request,
        })),
        on(authActions.registerFailure, (state, action) => ({
            ...state,
            isSubmitting: false,
            validatonErrors: action.errors,
        })),

        // login actions
        on(authActions.login, (state) => ({
            ...state,
            isSubmitting: true,
            validatonErrors: null,
        })),
        on(authActions.loginSuccess, (state, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.request,
        })),
        on(authActions.loginFailure, (state, action) => ({
            ...state,
            isSubmitting: false,
            validatonErrors: action.errors,
        })),

        // getOwnAccount actions
        on(authActions.getOwnAccount, (state) => ({
            ...state,
            isLoading: true,
            validatonErrors: null,
        })),
        on(authActions.getOwnAccountSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            currentUser: action.request,
        })),
        on(authActions.getOwnAccountFailure, (state, action) => ({
            ...state,
            isLoading: false,
            currentUser: null,
            validatonErrors: action.errors,
        })),

        // logout actions
        on(authActions.logout, (state) => ({
            ...state,
            isLoading: true,
            validatonErrors: null,
        })),
        on(authActions.logoutSuccess, (state) => ({
            ...state,
            isLoading: false,
            currentUser: null,
        })),
        on(authActions.logoutFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validatonErrors: action.errors,
        })),

        // router navigation
        on(routerNavigationAction, (state) => ({
            ...state,
            validatonErrors: null,
        })),
    ),
});

export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectIsSubmitting,
    selectIsLoading,
    selectCurrentUser,
    selectValidatonErrors,
} = authFeature;
