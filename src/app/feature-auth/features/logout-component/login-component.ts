import { Component, inject, OnInit } from '@angular/core';
import { authActions } from '@app/data-access';
import { Store } from '@ngrx/store';

@Component({
    selector: 'rcp-logout',
    imports: [],
    template: '',
})
export class LogoutComponent implements OnInit {
    private store = inject(Store);

    ngOnInit(): void {
        this.store.dispatch(authActions.logout());
    }
}
