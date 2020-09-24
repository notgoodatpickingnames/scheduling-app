import { Injectable, NgZone } from '@angular/core';
import { takeUntil, catchError, combineAll, map } from 'rxjs/operators';
import { SubscriptionBase } from '../../subscriptionBase';
import { Store } from './store';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable, throwError, ReplaySubject, merge, combineLatest, Subscription, of } from 'rxjs';
import { User } from 'nativescript-plugin-firebase';
import { CreateStoreRequest } from './createStoreRequest';
import { CreateStoreResponse } from './createStoreResponse';
import { HttpClient } from '@angular/common/http';
import { api } from '~/environment';

@Injectable({
    providedIn: 'root'
})
export class StoreService extends SubscriptionBase{

    private _storePath: string = "stores";
    private _userPath: string = "users";
    public store$ = new ReplaySubject<Store[]>(1);

    private relatedStoreIds: string[] = [];
    private combinedStoreListeners = new Subscription;

    constructor(private _ngZone: NgZone,
        private httpClient: HttpClient) {
        super();
    }

    // public list(userId: string): Observable<Store[]> {
    //     var t = this.getRelatedStoreIds(userId)
    //         .then(relatedStoreIds => {
    //             console.log(`after getting the relatedstoreids ${this.relatedStoreIds}`)
    //             if (relatedStoreIds && this.relatedStoreIds.toString() !== relatedStoreIds.toString()) {
    //                 this.relatedStoreIds = relatedStoreIds;
    //             }

    //             return this.retrieveStores(this.relatedStoreIds);
    //         })
    //         .catch(error => {
    //             console.log('SOMETHING WENT WRONG GETTING THE RELATED STORE IDS');
    //             return of(Store[0]);
    //         });


    // }

    public startListening(userId: string) {
        this.getRelatedStoreIds(userId)
            .then(relatedStoreIds => {
                if (relatedStoreIds && this.relatedStoreIds.toString() !== relatedStoreIds.toString()) {
                    this.relatedStoreIds = relatedStoreIds;
                    // this.getStoreListeners();
                }
            });
    }

    public create(store: Store, userId: string): Promise<any> {
        return firebase.push(this._storePath, store.asInterface())
            .then(response => {
                this.relatedStoreIds.push(response.key);
                this.setRelatedStoreIds(userId);
            });
    }

    public get(storeId: string): Promise<Store> {
        return firebase.getValue(`${this._storePath}/${storeId}`)
            .then(storeFromFirebase => new Store(storeFromFirebase['value'], storeId));
    }

    public getRelatedStoreIds(userId: string): Promise<string[]> {
        return firebase.getValue(`${this._userPath}/${userId}/relatedStores`)
            .then(relatedStoreIdsResponse => {
                return (relatedStoreIdsResponse.value as string[]);
            });
    };



    // private getStoreListeners() {
    //     this.combinedStoreListeners.unsubscribe();
    //     const storeListeners: Observable<Store>[] = [];

    //     if (this.relatedStoreIds) {
    //         this.relatedStoreIds.forEach(storeId => {
    //             const storeListener = this.getStoreListener(storeId);
    //             storeListeners.push(storeListener);
    //         });
    //     }

    //     this.combinedStoreListeners = combineLatest(storeListeners)
    //         .pipe(takeUntil(this.componentDestroyed))
    //         .subscribe(stores => {
    //             // Because it is possible to get back null if the user has lost permission to
    //             // see a store but somehow kept the relationship in their user table,
    //             // I'll filter out the undefineds.
    //             const definedStores = stores.filter(store => Boolean(store));
    //             this.store$.next(definedStores);
    //     });
    // }

    // private getStoreListener(storeId: string): Observable<any> {
    //     return new Observable((observer: any) => {

    //         const onValueEvent =(snapshot: any) => {
    //             this._ngZone.run(() => {
    //                 const results = this.handleSnapshot(snapshot.value, storeId);
    //                 observer.next(results);
    //             })
    //         }
    //         firebase.addValueEventListener(onValueEvent, `/${this._storePath}/${storeId}`);

    //     })
    //     .pipe(catchError(this.handleErrors));
    // }

    // private handleErrors(error: Response): Observable<never> {
    //     return throwError(error);
    // }

    // private handleSnapshot(data: any, storeId: string): Store {
    //     let store: Store;

    //     if (data) {
    //         store = new Store(data, storeId);
    //     }

    //     return store;
    // }
}
