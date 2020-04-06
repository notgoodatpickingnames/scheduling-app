import { Employee } from "./employee";

export interface IStore {
    ownerUserId: string,
    storeName: string;
    storeNumber: string;
    employees: Employee[];
    joinRequests: Employee[];
}
