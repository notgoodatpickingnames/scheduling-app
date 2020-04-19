import { User } from "./user";

export class UserCollection {
    public users: User[];
    public usersAsObject: {};

    constructor(users: User[]) {
        this.users = users;
    }

    public fromFirebase(data: any) {
        console.log(`data in user collection ${JSON.stringify(data)}`);
        
    }

    public addUser(user: User) {
        this.users.push(user);
        this.usersAsObject = {};

        this.users.forEach(user => {
            this.usersAsObject[user.userId] =  {storeAuthLevel: 'Owner' };
        });
    }
}
