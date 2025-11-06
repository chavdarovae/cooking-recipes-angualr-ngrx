import {
    HttpInterceptorFn,
    HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const tokenService = inject(HttpXsrfTokenExtractor);
    const token = tokenService.getToken();
    if (token !== null) {
        request = request.clone({ withCredentials: true });
    }

    return next(request);
};
