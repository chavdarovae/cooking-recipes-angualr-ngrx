import { IBackendErrors, IUser } from '@app/utils';

export interface IAuthStateInterface {
    isSubmitting: boolean;
    currentUser: IUser | null | undefined;
    isLoading: boolean;
    validatonErrors: IBackendErrors | null;
}
