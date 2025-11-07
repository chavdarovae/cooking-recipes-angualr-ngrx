import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
    CURR_USER_STPRAGE_KEY,
    ICreateUser,
    ILoginUser,
    IUser,
} from '@app/utils';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // services
    private http = inject(HttpClient);

    // main entity
    private currUser = signal<IUser | null | undefined>(undefined);
    currUserSig = computed(() => this.currUser());
    currUserSotrageKey = CURR_USER_STPRAGE_KEY;

    // auxiliary varibles
    private authApiUrl = environment.backendUrl + '/api/users';

    constructor() {
        const storedCurrUser = JSON.parse(
            localStorage.getItem(this.currUserSotrageKey) as string,
        );
        this.setCurrUser(storedCurrUser);
    }

    getOwnAccount(): Observable<IUser> {
        return this.http.get<IUser>(this.authApiUrl + '/ownAccount');
    }

    register(registerData: ICreateUser): Observable<IUser> {
        return this.http.post<IUser>(
            this.authApiUrl + '/register',
            registerData,
        );
    }

    login(loginData: ILoginUser): Observable<IUser> {
        return this.http.post<IUser>(this.authApiUrl + '/login', loginData);
    }

    logout(): Observable<null> {
        return this.http.get<null>(this.authApiUrl + '/logout');
    }

    setCurrUserAsGuest() {
        this.setCurrUser(null);
    }

    setCurrUser(user: IUser | null) {
        this.currUser.set(user);
        localStorage.setItem(this.currUserSotrageKey, JSON.stringify(user));
    }
}
