import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateUser, IUser, UtilService } from '@app/utils';
import { environment } from '@env/environment.development';
import { IUserQuery } from '../utils/user.interfaces';
import { Observable } from 'rxjs';
import { UserCreateItem, UserEditItem } from '../utils/user.models';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // services
    private http = inject(HttpClient);
    private utilService = inject(UtilService);

    // auxiliary varibles
    private userApiUrl = environment.backendUrl + '/api/users';

    getAllUsers(query: IUserQuery): Observable<IUser[]> {
        const params =
            this.utilService.transformQueryIntoParams<IUserQuery>(query);
        return this.http.get<IUser[]>(this.userApiUrl + '/accounts', {
            params,
        });
    }

    getUserById(userId: string): Observable<IUser> {
        return this.http.get<IUser>(this.userApiUrl + '/accounts/' + userId);
    }

    create(newUser: UserCreateItem): Observable<IUser> {
        return this.http.post<IUser>(this.userApiUrl + '/accounts', newUser);
    }

    delete(userId: string): Observable<IUser> {
        return this.http.delete<IUser>(this.userApiUrl + '/accounts/' + userId);
    }

    updatetUserById(modifiedUser: UserEditItem): Observable<IUser> {
        return this.http.put<IUser>(
            this.userApiUrl + '/accounts/' + modifiedUser._id,
            modifiedUser,
        );
    }
}
