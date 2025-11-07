import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError as throwErrorObservable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

export const errorCatchingInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
) => {
    const alertService = inject(AlertService);
    const authService = inject(AuthService);
    const router = inject(Router);

    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            // handle server side errors
            switch (error.status) {
                case 400:
                    alertService.showAlert({
                        alert: error.error?.errorMsg ?? 'Invalid information.',
                        type: 'danger',
                    });
                    break;
                case 401:
                    authService.setCurrUserAsGuest();
                    router.navigateByUrl('login');
                    break;
                case 403:
                    alertService.showAlert({
                        alert: 'You are not authorised for this section. Please login!',
                        type: 'danger',
                    });
                    break;
                case 404:
                    router.navigateByUrl('/404');
                    break;
                case 500:
                    alertService.showAlert({
                        alert: 'There is a server error',
                        type: 'danger',
                    });
                    break;
            }
            return throwErrorObservable(() => error);
        }),
    );
};
