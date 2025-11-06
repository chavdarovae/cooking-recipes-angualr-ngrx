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

export const redirectEffectAfterRegister = createEffect(
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
