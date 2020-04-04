import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardType } from '~/app/core/FormComponents/textField/keyboardType';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';
import { User } from 'nativescript-plugin-firebase';

@Component({
    selector: 'ns-sign-up',
    templateUrl: './signUp.component.html',
    styleUrls: ['./signUp.component.css']
})
export class SignUpComponent {
    @Input() public email: string = "";
    @Input() public password: string = "";
    @Output() public emailChange = new EventEmitter();
    @Output() public passWordChange = new EventEmitter();

    public reEnteredPassword: string = "";

    public emailKeyboardType = KeyboardType.email;
    public textKeyboardType = KeyboardType.text;

    constructor(private authenticationService: AuthenticationService) { }

    public onSignUpTap() {
        this.authenticationService.signUp(this.email, this.password)
            .then((user) => {

            }, (errorMessage) => {
                alert(errorMessage)
            });
    }

    private sendVerificationEmail(user: User) {
        user.sendEmailVerification().then(() => {
            alert('Check your email for a verification request!');
            this.emailChange.emit();
            this.passWordChange.emit();
        }, (errorMessage) => {
            alert(errorMessage);
        });
    }
}
