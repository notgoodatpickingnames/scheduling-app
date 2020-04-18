import { User } from "./user";

export class UserCollection {
    public users: User[];
    public usersAsObjectString: string = '';

    constructor(users: User[]) {
        this.users = users;
    }

    public fromFirebase(data: any) {
        console.log(`data in user collection ${JSON.stringify(data)}`);
        
    }

    public addUser(user: User) {
        this.users.push(user);
        this.usersAsObjectString = "'users' : {"

        this.users.forEach(user => {
            this.usersAsObjectString += `'${user.userId}' : {"storeAuthLevel" : "${user.storeAuthLevel}"}`;
        })

        this.usersAsObjectString += "}";
    }
}
