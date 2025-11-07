import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, UtilService } from '@app/utils';
import { environment } from '@env/environment.development';
import { IUserQuery } from '../utils/user.interfaces';
import { Observable } from 'rxjs';

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
        return this.http.get<IUser[]>(
            this.userApiUrl +
                '/accounts' +
                this.utilService.transformQueryIntoString(query),
        );
    }

    getUserById(userId: string): Observable<IUser> {
        return this.http.get<IUser>(this.userApiUrl + '/accounts/' + userId);
    }

    updatetUserById(modifiedUser: IUser): Observable<IUser> {
        return this.http.put<IUser>(
            this.userApiUrl + '/accounts/' + modifiedUser._id,
            modifiedUser,
        );
    }
}
