import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { api } from "~/environment";
import { IStore } from "../core/services/store/IStore";
import { Store } from "../core/services/store/store";
import * as firebase from "nativescript-plugin-firebase";

@Injectable()
export class StoreRepository {

    private _storePath: string = "stores";

    constructor(private httpClient: HttpClient) {}

    public list(): Observable<Store[]> {
        return this.httpClient.put<IStore[]>(`${api}store`, {})
            .pipe(map(stores =>
                stores.map(store => new Store(store['store'], store['storeId']))));
    }

    public insert(store: Store, userId: string): Promise<any> {
        return firebase.push(this._storePath, store.asInterface())
            .then(response => {
                // this.relatedStoreIds.push(response.key);
                // this.setRelatedStoreIds(userId);
            });
    }

    public get(storeId: string): Promise<Store> {
        return firebase.getValue(`${this._storePath}/${storeId}`)
            .then(storeFromFirebase => new Store(storeFromFirebase['value'], storeId));
    }


}
