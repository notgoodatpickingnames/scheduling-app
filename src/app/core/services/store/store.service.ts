import { Injectable, NgZone } from '@angular/core';
import { takeUntil, catchError, combineAll } from 'rxjs/operators';
import { SubscriptionBase } from '../../subscriptionBase';
import { Store } from './store';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable, throwError, ReplaySubject, merge, combineLatest, Subscription } from 'rxjs';
import { User } from 'nativescript-plugin-firebase';
import { CreateStoreRequest } from './createStoreRequest';
import { CreateStoreResponse } from './createStoreResponse';

@Injectable({
    providedIn: 'root'
})
export class StoreService extends SubscriptionBase{

    private _storePath: string = "stores";
    private _userPath: string = "users";
    public store$ = new ReplaySubject<Store[]>(1);

    private relatedStoreIds: string[];
    private combinedStoreListeners = new Subscription;

    constructor(private _ngZone: NgZone) {
        super();
    }

    public initialise(userId: string): void {
        console.log('calling init on the store service.. Ima unsubscribe all the observers.');
        this.store$.observers.forEach(observer => observer.complete())
        this.getRelatedStoreIds(userId)
            .then(relatedStoreIds => {
                this.relatedStoreIds = relatedStoreIds ? relatedStoreIds : [];
                console.log(`got related store ids ${this.relatedStoreIds}`);
                this.getStoreListeners();
            });
    }

    public create(store: Store, userId: string): Promise<any> {
        console.log('pushing new store');
        return firebase.push(this._storePath, store.asInterface())
            .then(response => {
                this.relatedStoreIds.push(response.key);
                firebase.setValue(`${this._userPath}/${userId}/relatedStores`, this.relatedStoreIds)
                    .then(() => {
                        console.log('added the new related store, regetting the store listeners.');
                        this.getStoreListeners();
                    });
            });
    }

    private getRelatedStoreIds(userId: string): Promise<string[]> { // Convert this to an event listener.
        return firebase.getValue(`${this._userPath}/${userId}/relatedStores`)
            .then(relatedStoreIdsResponse => {
                return (relatedStoreIdsResponse.value as string[]);
            });
    };

    private getStoreListeners() {
        this.combinedStoreListeners.unsubscribe();
        const storeListeners: Observable<Store>[] = [];

        if (this.relatedStoreIds) {
            this.relatedStoreIds.forEach(storeId => {
                const storeListener = this.getStoreListener(storeId);
                storeListeners.push(storeListener);
            });
        }

        this.combinedStoreListeners = combineLatest(storeListeners).pipe(takeUntil(this.componentDestroyed)).subscribe(stores => {
            console.log('emitting the stores');
            this.store$.next(stores);
        });
    }

    private getStoreListener(storeId: string): Observable<any> {
        return new Observable((observer: any) => {

            const onValueEvent =(snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value, storeId);
                    observer.next(results);
                })
            }
            console.log(storeId);
            firebase.addValueEventListener(onValueEvent, `/${this._storePath}/${storeId}`);

        })
        .pipe(catchError(this.handleErrors));
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }

    private handleSnapshot(data: any, storeId: string): Store {
        let store: Store;

        if (data) {
            console.log(`data from snapshot ${JSON.stringify(data)}`);
            store = new Store(data, storeId);
        }

        return store;
    }
}
