import { User } from "./user";

export interface IStore {
    storeName: string;
    storeNumber: string;
    users: User[];
    userJoinRequests: User[];
}
