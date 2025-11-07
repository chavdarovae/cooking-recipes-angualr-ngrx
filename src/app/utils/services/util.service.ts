import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    transformQueryIntoString(query: unknown) {
        const currQuery = query as Record<string, string>;
        let strToReturn = '?';

        for (const key in currQuery) {
            if (currQuery.hasOwnProperty(key) && !!currQuery[key]) {
                strToReturn += `${key}=${currQuery[key]}&`;
            }
        }
        return strToReturn;
    }
}
