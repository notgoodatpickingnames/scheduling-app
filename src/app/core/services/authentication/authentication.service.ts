import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, AuthStateChangeListener } from 'nativescript-plugin-firebase';
import { SecureStorage } from "nativescript-secure-storage"
import { Credentials } from './credentials';
import { LoginState } from './loginState';
import { AuthLevel } from './authLevel';
import * as FacebookSdk from 'nativescript-plugin-firebase'

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public user = new BehaviorSubject<User>(undefined);
    public loginState = new BehaviorSubject<LoginState>(LoginState.noCredentials);
    public authLevel = new BehaviorSubject<AuthLevel>(undefined);

    private secureStorage = new SecureStorage();
    private credentialsKey = 'cred';
    private emailVerifiedKey = 'verified';
    private _loginState = LoginState.loggedOut;

    constructor() {

    }

    public initialise(): void {
        this.getCredentials()
            .then((credentials) => {
                if (credentials) {
                    this.login(credentials)
                        .then(user => {
                            console.log(`logged in from init and got a user: ${user !== undefined}`);
                            if (user.emailVerified) {
                                this.setLoginState(LoginState.loggedInEmailVerified);
                                this.storeVerificationState(true);
                            }

                            if (!user.emailVerified) {
                                this.setLoginState(LoginState.loggedInEmailUnVerified);
                                this.storeVerificationState(false);
                            }

                            this.setUser(user);
                        })
                        .catch(error => {
                            this.setUser(undefined);
                            this.setLoginState(LoginState.loggedOut);
                            console.log(`login error ${error}`);
                        });
                    }
                else {
                    this.setUser(undefined);
                    this.setLoginState(LoginState.noCredentials);
                    console.log('no credentials stored on this phone');
                }
            })
            .catch((reason) => {
                console.log(reason);
            });
    }

    public setUser(user: User): void {
        if (user) {
            this.storeVerificationState(user.emailVerified);
        }

        this.user.next(user);
    }

    public setLoginState(loginState: LoginState) {
        this._loginState = loginState;
        this.loginState.next(this._loginState);
    }

    public saveCredentials(credentials: Credentials) {
        this.secureStorage.set({key: this.credentialsKey, value: credentials.asJson()});
    }

    public async getCredentials(): Promise<Credentials>  {
        const credentialsAsJson = await this.secureStorage.get({ key: this.credentialsKey });
        return Credentials.fromJson(credentialsAsJson);
    }

    public clearCredentials(): Promise<boolean> {
        return this.secureStorage.remove({key: this.credentialsKey});
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
            this.saveCredentials(credentials);
            this.setUser(user);
            this.setLoginState(LoginState.loggedInEmailUnVerified);
            return user;
        }
        catch (error) {
            this.setLoginState(LoginState.loggedOut);
            return undefined;
        }
    }

    public async relog(): Promise<User> {
        const credentials = await this.getCredentials();
        return await this.login(credentials);
    }

    public async logout(): Promise<any> {
        console.log('trying to logout');
        await firebase.logout();
        this.clearCredentials();
        this.loginState.next(LoginState.loggedOut);
        this.setUser(undefined);
    }

    public async getVerificationState(): Promise<boolean> {
        const emailVerifiedAsString = await this.secureStorage.get({ key: this.emailVerifiedKey });
        return emailVerifiedAsString === "1" ? true : false;
    }

    private storeVerificationState(emailVerified: boolean): void {
        this.secureStorage.set({key: this.emailVerifiedKey, value: emailVerified ? "1" : "0"})
    }
}
