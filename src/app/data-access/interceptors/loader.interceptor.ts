import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader-service';

export const loaderInterceptor: HttpInterceptorFn = (request, next) => {
    const loaderService = inject(LoaderService);
    loaderService.showLoader();

    return next(request).pipe(
        finalize(() => {
            loaderService.hideLoader();
        }),
    );
};
