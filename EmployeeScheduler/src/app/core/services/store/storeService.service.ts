import { Injectable, NgZone } from '@angular/core';
import { takeUntil, catchError } from 'rxjs/operators';
import { SubscriptionBase } from '../../subscriptionBase';
import { Store } from './store';
import * as firebase from 'nativescript-plugin-firebase';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StoreServiceService extends SubscriptionBase{

    private _path: string = "store"

    constructor(private _ngZone: NgZone) {
        super();
    }

    public initialise(): void {
        // this.load().pipe(takeUntil(this.componentDestroyed)).subscribe(shifts => {
        //     this.shift$.next(shifts);
        // });
    }

    public push(store: Store) {
        // firebase.push(this._path, store.asInterface());
    }

    public update(shift: Store) {
        // firebase.update(`${this._path}/${shift.shiftId}`, shift.asInterface())
    }

    public get(userId: string): Observable<Store> {
        // return this.shift$.pipe(map(shifts => shifts.find(shift => shift.shiftId === id)));
        // Return stores where the user id is in the employees or owners category.
        return null;
    }

    private load(): Observable<any> {
        return new Observable((observer: any) => {

            const onValueEvent =(snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                })
            }
            firebase.addValueEventListener(onValueEvent, `/${this._path}`);
        })
        .pipe(catchError(this.handleErrors));
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }

    private handleSnapshot(data: any): Store[] {
        const shifts = [];

        if (data) {
            for(const id in data) {
                if (data.hasOwnProperty(id)) {
                    const shiftToPush = new Store(data[id], id);
                    shifts.push(shiftToPush);
                }
            }
        }

        return shifts;
    }
}
