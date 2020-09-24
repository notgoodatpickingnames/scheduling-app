export class Credentials {
    public set email(email: string) {
        this._email = email.toLowerCase();
    }

    public set password(password: string) {
        this._password = password.toLowerCase();
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    private _email: string;
    private _password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public asJson(): string {
        return JSON.stringify({email: this.email, password: this.password});
    }

    public static fromJson(credentialsAsJson: string): Credentials {
        const parsedCredentials = JSON.parse(credentialsAsJson);
        return parsedCredentials ? new Credentials(parsedCredentials.email, parsedCredentials.password) : undefined;
    }
}
