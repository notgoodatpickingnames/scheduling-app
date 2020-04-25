import { StoreAuthLevel } from "./storeAuthLevel";

export class User {
    userId: string;
    displayName: string;
    storeAuthLevel: StoreAuthLevel;

    constructor(userId: string, displayName: string, storeAuthLevel: StoreAuthLevel) {
        this.userId = userId;
        this.displayName = displayName;
        this.storeAuthLevel = storeAuthLevel;
    }

    public asInterface() {

    }

    public static constructNew() {
        return new User('', '', StoreAuthLevel.unAuthorized);
    }
}
