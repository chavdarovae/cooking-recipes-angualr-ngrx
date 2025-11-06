import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core'
import { RouterModule } from '@angular/router'
import { APP_ROUTES } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authInterceptor, authReducer, errorCatchingInterceptor, loaderInterceptor, LoaderInterceptor } from '@app/data-access';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './app/data-access/store/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

bootstrapApplication(App, {
    providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([
        authInterceptor, 
        errorCatchingInterceptor, 
        loaderInterceptor
    ])),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(BrowserModule, RouterModule.forRoot(APP_ROUTES, {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
        onSameUrlNavigation: 'reload',
        useHash: true,
    })),
    provideStore({
        router: routerReducer
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75
    }),
    provideEffects(authEffects),
],
}).catch((err) => console.error(err));
