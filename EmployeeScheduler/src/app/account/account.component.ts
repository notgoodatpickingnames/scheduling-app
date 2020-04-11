import { Component, OnInit } from '@angular/core';
import { KeyboardType } from '../core/FormComponents/textField/keyboardType';
import { AuthenticationService } from '../core/services/authentication/authentication.service';
import { User, login } from 'nativescript-plugin-firebase';
import { SubscriptionBase } from '../core/subscriptionBase';
import { takeUntil } from 'rxjs/operators';
import { LoginState } from '../core/services/authentication/loginState';
import { Credentials } from '../core/services/authentication/credentials';

@Component({
    selector: 'ns-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent extends SubscriptionBase {
    public credentials = new Credentials('', '');

    public loginState = LoginState.loggedOut;
    public user: User;

    public showVerifyAccountPage: boolean = false;
    public showSignUpPage: boolean = false;
    public showLoginPage: boolean = false;

    public get showSettingsPage(): boolean {
        return this.user && this.user.emailVerified;
    }

    constructor(private authenticationService: AuthenticationService) {
        super();
        this.listenForLoginState();
        this.listenForUser();
    }

    public onSignupTap() {
        this.setShowSignUp();
    }

    public onBackToLoginTap() {
        this.setShowLogin();
    }

    public onLogoutTap() {
        this.authenticationService.logout();
    }

    public onAccountCreated() {
        this.setShowVerify();

        this.authenticationService.getCredentials()
            .then(credentials => {
                this.authenticationService.login(credentials)
                    .then(user => this.user = user);
            });
    }

    private listenForLoginState(): void {
        this.authenticationService.loginState
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(loginState => this.loginState = loginState);
    }

    private listenForUser(): void {
        this.authenticationService.user
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(user => {
                if (!user) {
                    this.setShowLogin();
                }

                if (user && !user.emailVerified) {
                    this.setShowVerify();
                }

                this.user = user;
            });
    }

    private setShowSignUp(): void {
        this.showVerifyAccountPage = false;
        this.showLoginPage = false;
        this.showSignUpPage = true;
    }

    private setShowLogin(): void {
        this.showVerifyAccountPage = false;
        this.showLoginPage = true;
        this.showSignUpPage = false;
    }

    private setShowVerify(): void {
        this.showVerifyAccountPage = true;
        this.showLoginPage = false;
        this.showSignUpPage = false;
    }
}
