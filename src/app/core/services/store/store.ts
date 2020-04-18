import { User } from "./user";
import { IStore } from "./IStore";
import { StoreAuthLevel } from "./storeAuthLevel";
import { Shift } from "../shift/shift";
import { Schedule } from "../schedule/schedule";
import { UserCollection } from "./userCollection";

export class Store {
    public storeId: string;
    public storeName: string;
    public storeNumber: string;
    public description: string;
    public userCollection: UserCollection;
    public userJoinRequests: User[];

    constructor(store: IStore, storeId: string) {
        console.log(`STORE ID ${storeId}`);
        console.log(`STORE ITSELF ${JSON.stringify(store)}`);
        this.storeId = storeId;
        this.storeName = store.storeName;
        this.description = store.description;
        this.userCollection = store.users !== undefined ? new UserCollection(store.users) : new UserCollection([]);
        this.userJoinRequests = store.userJoinRequests !== undefined ? store.userJoinRequests : [];
    }

    public setOwnerAsOnlyUser(userId: string, userDisplayName: string) {
        const owner = new User(userId, userDisplayName, StoreAuthLevel.owener);
        this.userCollection.addUser(owner);
    }

    public asInterface(): any {
        return {
            storeName: this.storeName,
            storeNumber: this.storeNumber,
            description: this.description,
            users: this.userCollection.usersAsObjectString,
            userJoinRequests: this.userJoinRequests
        }
    }

    public static constructNew(): Store {
        return new Store({
            storeName: '',
            storeNumber: '',
            description: '',
            users: [],
            userJoinRequests: []
        }, undefined)
    }
}
