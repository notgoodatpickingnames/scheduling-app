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

    public list(): Observable<any> {
        return this.httpClient.get<IStore[]>(`${api}store`)
            .pipe(map(stores =>
                stores.map(store => new Store(store))));
    }
}
