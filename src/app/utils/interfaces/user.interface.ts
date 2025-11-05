import { UserRolesEnum } from '../enums/user.enums';

export interface ICreateUser {
    username: string;
    email: string;
    password: string;
}

export interface IUserWithPassword extends ICreateUser {
    _id: string;
    role: UserRolesEnum;
}

export type IUser = Omit<IUserWithPassword, 'password'>;

export interface IUserQuery {
    search?: string;
    role?: UserRolesEnum;
}
