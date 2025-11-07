import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { InputFieldComponent, InputSelectComponent } from '@app/ui';
import { AuthService } from '@app/data-access';
import { UserQuery } from '@app/feature-user/utils/user.models';
import { IUser, UserRolesEnum } from '@app/utils';

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    imports: [RouterLink, InputFieldComponent, InputSelectComponent],
    providers: [NgForm],
})
export class UserListComponent implements OnInit {
    // services
    private authService = inject(AuthService);

    // main entity
    accountsSig: Signal<IUser[]> = this.authService.accountsSig;

    // auxiliary variables
    query!: UserQuery;
    userRolesEnum = UserRolesEnum;

    ngOnInit(): void {
        this.query = new UserQuery('');
        this.authService.relaodAccountList(this.query);
    }

    onSearchQueryChange() {
        this.authService.relaodAccountList(this.query);
    }
}
