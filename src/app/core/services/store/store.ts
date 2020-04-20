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
    public storeAuthLevelMessage: string;

    constructor(store: IStore, storeId: string) {
        this.storeId = storeId;
        this.storeName = store.storeName;
        this.description = store.description;
        this.userCollection = store.users !== undefined ? UserCollection.fromFirebase(store.users) : new UserCollection([]);
        this.userJoinRequests = store.userJoinRequests !== undefined ? store.userJoinRequests : [];
    }

    public setOwnerAsOnlyUser(userId: string, userDisplayName: string) {
        const owner = new User(userId, userDisplayName, StoreAuthLevel.owner);
        this.userCollection.addUser(owner);
    }

    public asInterface(): any {
        return {
            storeName: this.storeName,
            storeNumber: this.storeNumber,
            description: this.description,
            users: this.userCollection.usersAsObject,
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

    public setStoreAuthLevelMessage(userId: string) {
        if (this.userCollection.isUserOwner(userId)) {
            this.storeAuthLevelMessage = "You are the Owner."
        }

        if (this.userCollection.isUserManager(userId)) {
            this.storeAuthLevelMessage = "You are a Manager."
        }

        if (this.userCollection.isUserEmployee(userId)) {
            this.storeAuthLevelMessage = "You are an Employee."
        }

        if (this.userCollection.isUserARequestedUser(userId)) {
            this.storeAuthLevelMessage = "You have been requested to join this store."
        }
    }
}
