import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { IUser } from '@app/utils';
import { authActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const registerEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            ofType(authActions.register),
            switchMap(({ request }) => {
                return authService.register(request).pipe(
                    map((currUser: IUser) => {
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
