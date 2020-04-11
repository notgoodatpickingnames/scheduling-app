import { Injectable, NgZone } from '@angular/core';
import { takeUntil, catchError } from 'rxjs/operators';
import { SubscriptionBase } from '../../subscriptionBase';
import { Store } from './store';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable, throwError } from 'rxjs';
import { User } from 'nativescript-plugin-firebase';
import { CreateStoreRequest } from './createStoreRequest';
import { CreateStoreResponse } from './createStoreResponse';

@Injectable({
    providedIn: 'root'
})
export class StoreService extends SubscriptionBase{

    private _path: string = "stores"
    // private createStoreCloudFunction = firebase.functions.httpsCallable("createStore");

    constructor(private _ngZone: NgZone) {
        super();
    }

    public create(store: Store): Promise<any> {
        // const createStoreRequest: CreateStoreRequest = {storeName: store.storeName, storeDescription: store.description, userId: user.uid};
        // return this.createStoreCloudFunction(createStoreRequest)
        //     .then((response: CreateStoreResponse) => response.message)
        //     .catch(error => `There was an error creating the new store: ${error}`);
        console.log('pushing new store');
        return firebase.push(this._path, store.asInterface());
    }
}
