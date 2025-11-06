import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    AlertComponent,
    authActions,
    FooterComponent,
    HeaderComponent,
} from './data-access';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AlertComponent, HeaderComponent, FooterComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App implements OnInit {
    private store = inject(Store);

    ngOnInit(): void {
        this.store.dispatch(authActions.getOwnAccount());
    }
}
