import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, AuthStateChangeListener } from 'nativescript-plugin-firebase';
import { SecureStorage } from "nativescript-secure-storage"
import { Credentials } from './credentials';
import { LoginState } from './loginState';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public user: User;
    public loginState = new BehaviorSubject<LoginState>(LoginState.noCredentials);

    private secureStorage = new SecureStorage();
    private credentialsKey = 'cred';

    constructor() {

    }

    public initialise(): void {
        this.getCredentials()
            .then((credentials) => {
                //alert(`got creds email: ${credentials.email}, password: ${credentials.password}`);
                if (credentials) {
                    alert('found credentials, logging in.')
                    this.login(credentials.email, credentials.password);
                }
                else {
                    alert('no credentials saved');
                    this.loginState.next(LoginState.noCredentials);
                }
            })
            .catch((reason) => {
                alert(reason);
            });
    }

    public setUser(user: User): void {
        alert('setting the user');
        this.user = user;
    }

    public saveCredentials(credentials: Credentials) {
        this.secureStorage.set({key: this.credentialsKey, value: credentials.asJson()})
            .then(() => {
                alert('the password has been saved');
            });
    }

    private async getCredentials(): Promise<Credentials>  {
        const credentialsAsJson = await this.secureStorage.get({ key: this.credentialsKey });
        return Credentials.fromJson(credentialsAsJson);
    }

    private login(email: string, password: string): void {
        firebase.login({
            type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: email,
                    password: password
                }
            })
            .then(user => {
                this.setUser(user);
                this.loginState.next(LoginState.loggedIn);
            })
            .catch(error => {
                alert(error);
                this.loginState.next(LoginState.loggedOut);
            });
    }
}
