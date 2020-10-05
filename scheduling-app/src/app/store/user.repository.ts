import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { from, Observable } from "rxjs";

@Injectable()
export class UserRepository {
    private _userPath = 'users';

    constructor(private httpClient: HttpClient) {}

    // public update(userId: string, relatedStoreIds: string): Observable<string> {
    //     // return firebase.setValue(`${this._userPath}/${userId}/relatedStores`, relatedStoreIds);
    // }
}
