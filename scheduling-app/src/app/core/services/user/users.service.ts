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



    private setRelatedStoreIds(userId: string) {
        firebase.setValue(`${this._userPath}/${userId}/relatedStores`, this.relatedStoreIds)
            .then(() => {
                this.getStoreListeners();
            });
    }
}
