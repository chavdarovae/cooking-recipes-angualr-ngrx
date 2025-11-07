import { inject } from '@angular/core';
import { UserService } from './../data-access/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from './user-actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '@app/utils';

export const getAllUsersEffect = createEffect(
    (actions$ = inject(Actions), userService = inject(UserService)) => {
        return actions$.pipe(
            ofType(userActions.getAllUsers),
            switchMap(({ query }) => {
                return userService.getAllUsers(query).pipe(
                    map((userList: IUser[]) => {
                        return userActions.getAllUsersSuccess({ userList });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            userActions.getAllUsersFailure({
                                errors: err?.error?.errors,
                            }),
                        );
                    }),
                );
            }),
        );
    },
    { functional: true },
);
