import { Status } from "../enums/status";

export class Week {
    public status: Status;
    public startDate: Date;
    public endDate: Date;
    public displayName: string;

    constructor(startDate: Date) {
        this.startDate = startDate;
        this.endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
        this.displayName = `${this.startDate.toLocaleDateString()} - ${this.endDate.toLocaleDateString()}`;
    }
}
