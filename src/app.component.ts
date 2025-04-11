import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayout } from "./app/layout/component/app.layout";
import { AuthService } from './app/modules/auth/services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, AppLayout],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isAuthenticated: boolean;

    constructor(private _authService: AuthService) {
        if(localStorage.getItem('access_token')) {
            this._authService.is_User_LoggedIn.next(true);
            this.isAuthenticated = true;
        } else {
            this._authService.is_User_LoggedIn.next(false);
            this.isAuthenticated = false;
        }
    }

    ngOnInit() {
        this._authService.is_User_LoggedIn.subscribe(res => {
            this.isAuthenticated = res;
        })
    }
}
