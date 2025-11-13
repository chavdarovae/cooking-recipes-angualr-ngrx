import { inject } from '@angular/core';
import { UserService } from './../data-access/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from './user-actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '@app/utils';
import { Router } from '@angular/router';
import { AlertService } from '@app/data-access';

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

export const getUserByIdEffect = createEffect(
    (actions$ = inject(Actions), userService = inject(UserService)) => {
        return actions$.pipe(
            ofType(userActions.getUserById),
            switchMap(({ userId }) => {
                return userService.getUserById(userId).pipe(
                    map((user: IUser) => {
                        return userActions.getUserByIdSuccess({ user });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            userActions.getUserByIdFailure({
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

export const createUserEffect = createEffect(
    (actions$ = inject(Actions), userService = inject(UserService)) => {
        return actions$.pipe(
            ofType(userActions.createUser),
            switchMap(({ user }) => {
                return userService.create(user).pipe(
                    map((user: IUser) => {
                        return userActions.createUserSuccess({ user });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            userActions.createUserFailure({
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

export const redirectAfterCreateUserSuccessEffect = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
        alertService = inject(AlertService),
    ) => {
        return actions$.pipe(
            ofType(userActions.createUserSuccess),
            tap(() => {
                alertService.showSuccessAlert('user', 'created');
                router.navigateByUrl('/users');
            }),
        );
    },
    { functional: true, dispatch: false },
);

export const deleteUserEffect = createEffect(
    (actions$ = inject(Actions), userService = inject(UserService)) => {
        return actions$.pipe(
            ofType(userActions.deleteUser),
            switchMap(({ userId }) => {
                return userService.delete(userId).pipe(
                    map((user: IUser) => {
                        return userActions.deleteUserSuccess();
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            userActions.deleteUserFailure({
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

export const redirectAfterDeleteUserSuccessEffect = createEffect(
    (actions$ = inject(Actions), alertService = inject(AlertService)) => {
        return actions$.pipe(
            ofType(userActions.deleteUserSuccess),
            tap(() => {
                alertService.showSuccessAlert('user', 'deleted');
            }),
        );
    },
    { functional: true, dispatch: false },
);

export const updateUserByIdEffect = createEffect(
    (actions$ = inject(Actions), userService = inject(UserService)) => {
        return actions$.pipe(
            ofType(userActions.updateUserById),
            switchMap(({ user }) => {
                return userService.updatetUserById(user).pipe(
                    map((user: IUser) => {
                        return userActions.updateUserByIdSuccess({ user });
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(
                            userActions.updateUserByIdFailure({
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

export const redirectAfterUpdateUserByIdSuccessEffect = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
        alertService = inject(AlertService),
    ) => {
        return actions$.pipe(
            ofType(userActions.updateUserByIdSuccess),
            tap(() => {
                alertService.showSuccessAlert('user', 'updated');
                router.navigateByUrl('/users');
            }),
        );
    },
    { functional: true, dispatch: false },
);
