import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PersistantService {
    setToLocalStorage(key: string, data: unknown): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to Local storage', error);
        }
    }

    getFromLocalStorage(key: string): unknown {
        try {
            const rawItem = localStorage.getItem(key);
            return rawItem ? JSON.parse(rawItem) : null;
        } catch (error) {
            console.error('Error getting to Local storage', error);
            return null;
        }
    }

    setToSessionStorage(key: string, data: unknown): void {
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to Session storage', error);
        }
    }

    getFromSessionStorage(key: string): unknown {
        try {
            const rawItem = sessionStorage.getItem(key);
            return rawItem ? JSON.parse(rawItem) : null;
        } catch (error) {
            console.error('Error getting to Session storage', error);
            return null;
        }
    }
}
