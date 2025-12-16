import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    transformQueryIntoParams<T>(query: T): HttpParams {
        let params = new HttpParams();
        for (const key in query) {
            const value = query[key];

            if (!['string', 'number', 'boolean'].includes(typeof value))
                continue;

            params = params.append(key, String(value));
        }
        return params;
    }
}
