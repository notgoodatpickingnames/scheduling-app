import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'nativescript-plugin-firebase';
import * as SecureStorage from 'nativescript-secure-storage';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public initialise(): void {
        // this.load().pipe(takeUntil(this.componentDestroyed)).subscribe(schedules => {
        //     this.schedule$.next(schedules);
        // });
    }

    public signUp(email: string, password: string): Promise<User> {
        return firebase.createUser({
            email: email,
            password: password
          });
    }

    // public login(email: string, password: string):

}
