import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../store/user";
import * as firebase from "nativescript-plugin-firebase";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public user$: BehaviorSubject<User>;

    private _user: User;
    private _userPath: string = "users";

    private setRelatedStoreIds(userId: string) {
        firebase.setValue(`${this._userPath}/${userId}/relatedStores`, this.relatedStoreIds)
            .then(() => {
                this.getStoreListeners();
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
            firebase.addValueEventListener(onValueEvent, `/${this._storePath}/${storeId}`);

        })
        .pipe(catchError(this.handleErrors));
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }

    public get(storeId: string): Promise<Store> {
        return firebase.getValue(`${this._storePath}/${storeId}`)
            .then(storeFromFirebase => new Store(storeFromFirebase['value'], storeId));
    }

    private handleSnapshot(data: any, storeId: string): User {
        let store: Store;

        if (data) {
            store = new Store(data, storeId);
        }

        return store;
    }
}
