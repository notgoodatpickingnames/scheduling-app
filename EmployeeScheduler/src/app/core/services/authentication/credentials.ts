export class Credentials {
    public email: string;
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public asJson(): string {
        return JSON.stringify({email: this.email, password: this.password});
    }

    public static fromJson(credentialsAsJson: string): Credentials {
        const parsedCredentials = JSON.parse(credentialsAsJson);
        return parsedCredentials ? new Credentials(parsedCredentials.email, parsedCredentials.password) : new Credentials('', '');
    }
}