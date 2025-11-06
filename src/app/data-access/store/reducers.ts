import { createFeature, createReducer, on } from '@ngrx/store';
import { IAuthStateInterface } from '../interfaces/auth-state-interface';
import { authActions } from './actions';

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
