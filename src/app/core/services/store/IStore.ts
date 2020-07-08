import { User } from "./user";

export interface IStore {
    storeName: string;
    storeNumber: string;
    description: string;
    users: any;
    userJoinRequests: User[];
}