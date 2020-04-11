import { User } from "./user";

export interface IStore {
    storeName: string;
    storeNumber: string;
    description: string;
    users: User[];
    userJoinRequests: User[];
}
