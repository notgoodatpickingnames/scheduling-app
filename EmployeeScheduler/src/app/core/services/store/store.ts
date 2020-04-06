import { Employee } from "./employee";
import { IStore } from "./IStore";

export class Store {
    public id: string;
    public ownerUserId: string;
    public storeName: string;
    public storeNumber: string;
    public employees: Employee[];
    public joinRequests: Employee[];

    constructor(store: IStore, id: string) {
        this.id = id;
        this.ownerUserId
    }

    public asInterface(): IStore {
        return {
            ownerUserId: this.ownerUserId,
            storeName: this.storeName,
            storeNumber: this.storeNumber,
            employees: this.employees,
            joinRequests: this.joinRequests
        }
    }
}
