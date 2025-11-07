import { AuthService } from '@app/data-access/services/auth.service';
import { PersistantService } from './../../utils/services/persistant.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { IUser } from '@app/utils';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export const registerEffect = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        persistantService = inject(PersistantService),
    ) => {
        return actions$.pipe(
            ofType(authActions.register),
            switchMap(({ request }) => {
                return authService.register(request).pipe(
                    map((currUser: IUser) => {
                        // side effects
                        persistantService.setToLocalStorage(
                            authService.currUserSotrageKey,
                            currUser,
                        );

                        return authActions.registerSuccess({
                            request: currUser,
                        });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            authActions.registerFailure({
                                errors: err.error.errors,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    { functional: true },
);

export const redirectEffectAfterRegisterSuccess = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.registerSuccess),
            tap(() => {
                router.navigateByUrl('/');
            }),
        );
    },
    { functional: true, dispatch: false },
);

export const loginEffect = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        persistantService = inject(PersistantService),
    ) => {
        return actions$.pipe(
            ofType(authActions.login),
            switchMap(({ request }) => {
                return authService.login(request).pipe(
                    map((currUser: IUser) => {
                        // side effects
                        persistantService.setToLocalStorage(
                            authService.currUserSotrageKey,
                            currUser,
                        );

                        return authActions.loginSuccess({
                            request: currUser,
                        });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            authActions.loginFailure({
                                errors: err.error.errors,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    { functional: true },
);

export const redirectEffectAfterLoginSuccess = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.loginSuccess),
            tap(() => {
                router.navigateByUrl('/');
            }),
        );
    },
    { functional: true, dispatch: false },
);

export const getOwnAccountEffect = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        persistantService = inject(PersistantService),
    ) => {
        return actions$.pipe(
            ofType(authActions.getOwnAccount),
            switchMap(() => {
                return authService.getOwnAccount().pipe(
                    map((currUser: IUser) => {
                        // side effects
                        persistantService.setToLocalStorage(
                            authService.currUserSotrageKey,
                            currUser,
                        );

                        return authActions.getOwnAccountSuccess({
                            request: currUser,
                        });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            authActions.getOwnAccountFailure({
                                errors: err.error.errors,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    { functional: true },
);

export const redirectEffectAftergetOwnAccountSuccess = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.getOwnAccountSuccess),
            tap(() => {
                router.navigateByUrl('/');
            }),
        );
    },
    { functional: true, dispatch: false },
);

export const logoutEffect = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        persistantService = inject(PersistantService),
    ) => {
        return actions$.pipe(
            ofType(authActions.logout),
            switchMap(() => {
                return authService.logout().pipe(
                    map(() => {
                        // side effects
                        persistantService.setToLocalStorage(
                            authService.currUserSotrageKey,
                            null,
                        );

                        return authActions.logoutSuccess();
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            authActions.logoutFailure({
                                errors: err.error.errors,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    { functional: true },
);

export const redirectEffectAftergetLogoutSuccess = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.logoutSuccess),
            tap(() => {
                router.navigateByUrl('/users/login');
            }),
        );
    },
    { functional: true, dispatch: false },
);
