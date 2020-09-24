import { Shift } from "~/app/core/services/shift/shift";
import { UserAccount } from "~/app/core/services/account/userAccount";
import { ISchedule } from "./ISchedule";

export class Schedule {
    public scheduleId: string;
    public shiftId: string;
    public userIds: string[] = [];
    public date: Date;

    constructor(schedule: ISchedule, id: string) {
        this.scheduleId = id;
        this.shiftId = schedule.shiftId;
        this.userIds = schedule.userIds;
        this.date = schedule.date !== undefined ? new Date(schedule.date) : undefined;
    }

    public asInterface(): ISchedule {
        return {
            date: this.date !== undefined && this.date.toString() !== "Invalid Date" ? this.date.toString() : "",
            shiftId: this.shiftId ? this.shiftId : "",
            userIds: this.userIds ? this.userIds : []
        }
    }
}