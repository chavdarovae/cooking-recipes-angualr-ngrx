import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core'
import { RouterModule } from '@angular/router'
import { APP_ROUTES } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, AuthInterceptor, authReducer, ErrorCatchingInterceptor, LoaderInterceptor } from '@app/data-access';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './app/data-access/store/effects';

bootstrapApplication(App, {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(),
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(BrowserModule, RouterModule.forRoot(APP_ROUTES, {
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
            onSameUrlNavigation: 'reload',
            useHash: true,
        })),
        provideStore(),
        provideState(authFeatureKey, authReducer),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            trace: false,
            traceLimit: 75
        }),
        provideEffects(authEffects),
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptor, 
            multi: true 
        },
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: ErrorCatchingInterceptor, 
            multi: true 
        },
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: LoaderInterceptor, 
            multi: true 
        },
    ],
}).catch((err) => console.error(err));
