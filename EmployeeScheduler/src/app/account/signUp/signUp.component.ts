import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardType } from '~/app/core/FormComponents/textField/keyboardType';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';
import { User } from 'nativescript-plugin-firebase';
import * as firebase from 'nativescript-plugin-firebase';
import { Credentials } from '~/app/core/services/authentication/credentials';
import { take, takeUntil } from 'rxjs/operators';
import { SubscriptionBase } from '~/app/core/subscriptionBase';

@Component({
    selector: 'ns-sign-up',
    templateUrl: './signUp.component.html',
    styleUrls: ['./signUp.component.css']
})
export class SignUpComponent extends SubscriptionBase {
    @Output() onBackToLoginTap = new EventEmitter();
    @Output() onAccountCreated = new EventEmitter();
    public credentials = new Credentials('', '');

    public reEnteredPassword: string = "";

    public emailKeyboardType = KeyboardType.email;
    public textKeyboardType = KeyboardType.text;

    constructor(private authenticationService: AuthenticationService) {
        super();
    }

    public onSignUpTap() {
        console.log(`Trying to sign up with email: ${this.credentials.email} and password: ${this.credentials.password}`);
        firebase.createUser({
            email: this.credentials.email,
            password: this.credentials.password
          }).then((user) => {
                this.authenticationService.saveCredentials(this.credentials);
                this.sendVerificationEmail(user);
                this.onAccountCreated.emit();
            }, (errorMessage) => {
                console.log(errorMessage)
            });
    }

    public onBackToLoginTapped() {
        this.onBackToLoginTap.emit();
    }

    private sendVerificationEmail(user: User) {
        user.sendEmailVerification();
    }
}
