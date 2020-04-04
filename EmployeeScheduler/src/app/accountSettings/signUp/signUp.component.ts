import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardType } from '~/app/core/FormComponents/textField/keyboardType';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';
import { User } from 'nativescript-plugin-firebase';
import * as firebase from 'nativescript-plugin-firebase';
import { Credentials } from '~/app/core/services/authentication/credentials';

@Component({
    selector: 'ns-sign-up',
    templateUrl: './signUp.component.html',
    styleUrls: ['./signUp.component.css']
})
export class SignUpComponent {
    public credentials = new Credentials('', '');
    @Output() public accountCreated = new EventEmitter<User>();

    public reEnteredPassword: string = "";

    public emailKeyboardType = KeyboardType.email;
    public textKeyboardType = KeyboardType.text;

    constructor(private authenticationService: AuthenticationService) { }

    public onSignUpTap() {

        firebase.createUser({
            email: this.credentials.email,
            password: this.credentials.password
          }).then((user) => {
                this.authenticationService.saveCredentials(this.credentials);
                this.sendVerificationEmail(user);
            }, (errorMessage) => {
                alert(errorMessage)
            });
    }

    private sendVerificationEmail(user: User) {
        user.sendEmailVerification().then(() => {
            alert('Check your email for a verification request!');
            this.accountCreated.emit(user);
        }, errorMessage => {
            alert(errorMessage);
        });
    }
}