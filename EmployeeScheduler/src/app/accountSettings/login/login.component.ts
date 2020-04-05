import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Credentials } from '~/app/core/services/authentication/credentials';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';
import { User } from 'nativescript-plugin-firebase';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    @Output() public onSignupTap = new EventEmitter();

    public credentials = new Credentials('', '');
    public showFailToLoginError: boolean = false;

    constructor(private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute) { }

    public onLoginTap(): void {
        console.log(`Trying to login with email: ${this.credentials.email} and password: ${this.credentials.password}`);
        this.authenticationService.login(this.credentials)
            .then(() => this.router.navigate(['yourSchedule'], {relativeTo: this.route}))
            .catch(() => this.showFailToLoginError = true);
    }

    public onSignupTapped(): void {
        this.onSignupTap.emit();
    }

}
