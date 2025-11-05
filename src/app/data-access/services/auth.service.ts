import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICreateUser, IUser, IUserQuery, UtilService } from '@app/utils';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // services
    private http = inject(HttpClient);
    private router = inject(Router);
    private utilService = inject(UtilService);

    // main entity
    private currUser = signal<IUser | null | undefined>(undefined);
    currUserSig = computed(() => this.currUser());

    // service state account list
    private relaodAccountsSubj: Subject<IUserQuery> = new Subject();
    private accounts$: Observable<IUser[]> = this.relaodAccountsSubj
        .asObservable()
        .pipe(
            switchMap((query: IUserQuery) => this.getAllAccounts(query)),
            shareReplay(),
        );
    accountsSig = toSignal(this.accounts$, { initialValue: [] as IUser[] });

    // auxiliary varibles
    private accountApi = environment.backendUrl + '/api/users';
    private currUserSotrageKey = 'currUser';

    constructor() {
        const storedCurrUser = JSON.parse(
            localStorage.getItem(this.currUserSotrageKey) as string,
        );
        this.setCurrUser(storedCurrUser);
    }

    relaodAccountList(query: IUserQuery) {
        this.relaodAccountsSubj.next(query);
    }

    getOwnAccount(): Observable<IUser> {
        return this.http.get<IUser>(this.accountApi + '/ownAccount').pipe(
            tap((user: IUser) => this.setCurrUser(user)),
            first(),
        );
    }

    register(registerData: ICreateUser): Observable<IUser> {
        return this.http
            .post<IUser>(this.accountApi + '/register', registerData)
            .pipe(
                tap((user: IUser) => this.setCurrUser(user)),
                first(),
            );
    }

    login(loginData: IUser): Observable<IUser> {
        return this.http
            .post<IUser>(this.accountApi + '/login', loginData)
            .pipe(
                tap((user: IUser) => {
                    this.setCurrUser(user);
                    this.router.navigateByUrl('/');
                }),
                first(),
            );
    }

    logout(): Observable<any> {
        return this.http.get<IUser>(this.accountApi + '/logout').pipe(
            tap(() => {
                this.setCurrUserAsGuest();
                this.router.navigateByUrl('/');
            }),
            first(),
        );
    }

    getAllAccounts(query: IUserQuery): Observable<IUser[]> {
        return this.http.get<IUser[]>(
            this.accountApi +
                '/accounts' +
                this.utilService.transformQueryIntoString(
                    query as unknown as Record<string, string>,
                ),
        );
    }

    getAccount(userId: string): Observable<IUser> {
        return this.http
            .get<IUser>(this.accountApi + '/accounts/' + userId)
            .pipe(first());
    }

    updateAccount(modifiedUser: IUser): Observable<IUser> {
        return this.http
            .put<IUser>(
                this.accountApi + '/accounts/' + modifiedUser._id,
                modifiedUser,
            )
            .pipe(first());
    }

    setCurrUserAsGuest() {
        this.setCurrUser(null);
    }

    private setCurrUser(user: IUser | null) {
        this.currUser.set(user);
        localStorage.setItem(this.currUserSotrageKey, JSON.stringify(user));
    }
}
