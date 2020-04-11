import { User } from "./user";
import { IStore } from "./IStore";
import { StoreAuthLevel } from "./storeAuthLevel";

export class Store {
    public storeId: string;
    public storeName: string;
    public storeNumber: string;
    public description: string;
    public users: User[];
    public userJoinRequests: User[];

    constructor(store: IStore, storeId: string) {
        this.storeId = storeId;
        this.storeName = store.storeName;
        this.description = store.description;
        this.users = store.users !== undefined ? store.users : [];
        this.userJoinRequests = store.userJoinRequests !== undefined ? store.userJoinRequests : [];
    }

    public setOwnerAsOnlyUser(userId: string, userDisplayName: string) {
        const owner = new User(userId, userDisplayName, StoreAuthLevel.owener);
        this.users = [owner];
    }

    public asInterface(): IStore {
        return {
            storeName: this.storeName,
            storeNumber: this.storeNumber,
            description: this.description,
            users: this.users,
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
