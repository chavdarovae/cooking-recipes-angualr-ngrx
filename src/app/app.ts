import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    AlertComponent,
    FooterComponent,
    HeaderComponent,
} from './data-access';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AlertComponent, HeaderComponent, FooterComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App implements OnInit {
    protected readonly title = signal('cooking-recipes-angualr-ngrx');

    ngOnInit(): void {
        console.log('app is there');
    }
}
