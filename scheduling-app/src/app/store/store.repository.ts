import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { api } from "~/environment";
import { IStore } from "../core/services/store/IStore";
import { Store } from "../core/services/store/store";

@Injectable()
export class StoreRepository {
    constructor(private httpClient: HttpClient) {}

    public list(storeIds: string[]): Observable<Store[]> {
        return this.httpClient.put<IStore[]>(`${api}/store`,
            {
                storeIds
            })
            .pipe(map(stores => stores.map(store => new Store(store['store'], store['storeId']))));
    }
}
