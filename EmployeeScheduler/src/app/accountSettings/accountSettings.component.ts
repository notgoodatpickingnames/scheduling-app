import { Component, OnInit } from '@angular/core';
import { KeyboardType } from '../core/FormComponents/textField/keyboardType';
import { AuthenticationService } from '../core/services/authentication/authentication.service';
import { User } from 'nativescript-plugin-firebase';

@Component({
    selector: 'ns-account-settings',
    templateUrl: './accountSettings.component.html',
    styleUrls: ['./accountSettings.component.css']
})
export class AccountSettingsComponent {
    public email: string = "";
    public password: string = "";

    public hasUserBeenVerified: boolean;
    public doesUserHaveLocalAccount: boolean;

    constructor(private authenticationService: AuthenticationService) { }

    

}
