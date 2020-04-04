import { Component, OnInit } from '@angular/core';
import { Credentials } from '~/app/core/services/authentication/credentials';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new Credentials('', '');

    constructor(private authenticationService: AuthenticationService) { }

    public onLoginTap(): void {
        
    }

}
