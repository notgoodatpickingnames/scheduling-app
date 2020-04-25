import { User } from "./user";
import { StoreAuthLevel } from "./storeAuthLevel";

export class UserCollection {
    public users: User[] = [];
    public usersAsObject: {};

    constructor(users: User[]) {
        users.forEach(user => this.addUser(user));
    }

    public static fromFirebase(userCollectionFromFirebase: any) {
        const users: User[] = [];

        if (userCollectionFromFirebase) {
            for(const id in userCollectionFromFirebase) {
                const userValueAsObject = (userCollectionFromFirebase[id] as {storeAuthLevel: StoreAuthLevel, displayName: string});
                const userToAdd = new User(id, userValueAsObject.displayName, userValueAsObject.storeAuthLevel);
                users.push(userToAdd);
            }
        }

        return new UserCollection(users);
    }

    public addUser(user: User) {
        this.users.push(user);
        this.usersAsObject = {};

        this.users.forEach(user => {
            this.usersAsObject[user.userId] =  {storeAuthLevel: 'Owner' };
        });
    }

    public isUserOwner(userId: string) {
        return this.users.find(user => user.userId === userId
            && user.storeAuthLevel === StoreAuthLevel.owner) !== undefined;
    }

    public isUserManager(userId: string) {
        return this.users.find(user => user.userId === userId
            && user.storeAuthLevel === StoreAuthLevel.manager) !== undefined;
    }

    public isUserEmployee(userId: string) {
        return this.users.find(user => user.userId === userId
            && user.storeAuthLevel === StoreAuthLevel.employee) !== undefined;
    }

    public isUserARequestedUser(userId: string) {
        return this.users.find(user => user.userId === userId
            && user.storeAuthLevel === StoreAuthLevel.requested) !== undefined;
    }

    public isUserUnAuthorized(userId: string) {
        return this.users.find(user => user.userId === userId
            && user.storeAuthLevel === StoreAuthLevel.unAuthorized) !== undefined;
    }
}
