import { IBackendErrors, IUser, UserRolesEnum } from '@app/utils';

export interface IUserState {
    isLoading: boolean;
    validatonErrors: IBackendErrors | null;
    userList: IUser[] | null;
}

export interface IUserQuery {
    search?: string;
    role?: UserRolesEnum;
}
