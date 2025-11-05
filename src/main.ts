import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(App, {
    providers: [
		provideBrowserGlobalErrorListeners(), 
		provideZoneChangeDetection({ eventCoalescing: true }), 
		provideRouter(APP_ROUTES)
	],
}).catch((err) => console.error(err));
