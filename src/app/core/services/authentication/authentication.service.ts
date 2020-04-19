import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, AuthStateChangeListener } from 'nativescript-plugin-firebase';
import { SecureStorage } from "nativescript-secure-storage"
import { Credentials } from './credentials';
import { LoginState } from './loginState';
import { AuthLevel } from './authLevel';
import { UserAccount } from '../account/userAccount';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public user = new BehaviorSubject<User>(undefined);
    public loginState = new BehaviorSubject<LoginState>(undefined);
    public authLevel = new BehaviorSubject<AuthLevel>(undefined);

    private secureStorage = new SecureStorage();
    private credentialsKey = 'cred';
    private emailVerifiedKey = 'verified';
    private _loginState = LoginState.loggedOut;

    constructor() {

    }

    public initialise(): Promise<any> {
        return this.getCredentials()
            .then((credentials) => {
                if (!credentials) {
                    this.setLoginState(LoginState.noCredentials);
                    console.log('no credentials stored on this phone');
                }

                this.login(credentials)
                    .then(user => {
                        if (user.emailVerified) {
                            this.setLoginState(LoginState.loggedInEmailVerified);
                            this.storeEmailVerificationState(true);
                        } else {
                            this.setLoginState(LoginState.loggedInEmailUnVerified);
                            this.storeEmailVerificationState(false);
                        }

                        this.setUser(user);
                        return user;
                    })
                    .catch(error => {
                        this.setUser(undefined);
                        this.setLoginState(LoginState.loggedOut);
                        console.log(`login error ${error}`);
                        return ;
                    });
            })
            .catch((reason) => {
                console.log(reason);
                return Promise.reject;
            });
    }

    public setUser(user: User): void {
        if (user) {
            this.storeEmailVerificationState(user.emailVerified);
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
            if (user.emailVerified) {
                this.setLoginState(LoginState.loggedInEmailVerified);
            } else {
                this.setLoginState(LoginState.loggedInEmailUnVerified);
            }

            this.getUserRecord(user.uid)
                .then(getUserResponse => {
                    if (getUserResponse.value) {
                        console.log(`got a value for the user ${getUserResponse.value}`);
                    }
                    else {
                        this.createUserRecord(user.uid, 'user.displayName')
                            .then(userCreatedResposne => console.log(`Created User Record with`))
                            .catch(error => console.log(error));
                    }
                })
            return user;
        }
        catch (error) {
            console.log('failed to login boi');
            this.setLoginState(LoginState.loggedOut);
            return Promise.reject(error);
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

    public async getEmailVerificationState(): Promise<boolean> {
        const emailVerifiedAsString = await this.secureStorage.get({ key: this.emailVerifiedKey });
        return emailVerifiedAsString === "1" ? true : false;
    }

    private storeEmailVerificationState(emailVerified: boolean): void {
        this.secureStorage.set({key: this.emailVerifiedKey, value: emailVerified ? "1" : "0"})
    }

    private getUserRecord(userId: string): Promise<any> {
        return firebase.getValue(`users/${userId}`);
    }

    private createUserRecord(userId: string, displayName: string): Promise<any> {
        return firebase.setValue(`users/${userId}`, {displayName: displayName});
    }
}
