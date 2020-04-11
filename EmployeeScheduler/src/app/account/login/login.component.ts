import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Credentials } from '~/app/core/services/authentication/credentials';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';
import { User } from 'nativescript-plugin-firebase';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { KeyboardType } from '~/app/core/FormComponents/textField/keyboardType';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    @Input() public credentials = new Credentials('', '');
    @Output() public onSignupTap = new EventEmitter();

    public showFailToLoginError: boolean = false;

    public emailKeyboardType = KeyboardType.email;

    constructor(private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute) { }

    public onLoginTap(): void {
        this.authenticationService.login(this.credentials)
            .then(() => this.router.navigate(['../personalSchedule'], {relativeTo: this.route}))
            .catch(error => {
                this.showFailToLoginError = true
            });
    }

    public onSignupTapped(): void {
        this.onSignupTap.emit();
    }

}
