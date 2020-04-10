import { User } from "./user";
import { IStore } from "./IStore";

export class Store {
    public storeId: string;
    public storeName: string;
    public storeNumber: string;
    public users: User[];
    public userJoinRequests: User[];

    constructor(store: IStore, storeId: string) {
        this.storeId = storeId;
        this.storeName = store.storeName;
        this.users = store.users !== undefined ? store.users : [];
        this.userJoinRequests = store.userJoinRequests !== undefined ? store.userJoinRequests : [];
    }

    public asInterface(): IStore {
        return {
            storeName: this.storeName,
            storeNumber: this.storeNumber,
            users: this.users,
            userJoinRequests: this.userJoinRequests
        }
    }

    public static constructNew(): Store {
        return new Store({
            storeName: '',
            storeNumber: '',
            users: [],
            userJoinRequests: []
        }, undefined)
    }
}
