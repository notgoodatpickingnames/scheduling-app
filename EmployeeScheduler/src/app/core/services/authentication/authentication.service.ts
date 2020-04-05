import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, AuthStateChangeListener } from 'nativescript-plugin-firebase';
import { SecureStorage } from "nativescript-secure-storage"
import { Credentials } from './credentials';
import { LoginState } from './loginState';
import { AuthLevel } from './authLevel';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public user = new BehaviorSubject<User>(undefined);
    public loginState = new BehaviorSubject<LoginState>(LoginState.noCredentials);
    public authLevel = new BehaviorSubject<AuthLevel>(undefined);

    private secureStorage = new SecureStorage();
    private credentialsKey = 'cred';

    constructor() {

    }

    public initialise(): void {
        this.getCredentials()
            .then((credentials) => {
                if (credentials) {
                    this.login(credentials)
                        .then(user => this.setUser(user))}
                else {
                    this.setUser(undefined);
                    this.loginState.next(LoginState.noCredentials);
                }
            })
            .catch((reason) => {
                alert(reason);
            });
    }

    public setUser(user: User): void {
        this.user.next(user);
    }

    public saveCredentials(credentials: Credentials) {
        this.secureStorage.set({key: this.credentialsKey, value: credentials.asJson()});
    }

    public async getCredentials(): Promise<Credentials>  {
        const credentialsAsJson = await this.secureStorage.get({ key: this.credentialsKey });
        return Credentials.fromJson(credentialsAsJson);
    }

    public async login(credentials: Credentials): Promise<User> {
        try {
            const user = await firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: credentials.email,
                    password: credentials.password
                }
            });
            this.setUser(user);
            this.loginState.next(LoginState.loggedIn);
            return user;
        }
        catch (error) {
            this.loginState.next(LoginState.loggedOut);
            return undefined;
        }
    }
}
