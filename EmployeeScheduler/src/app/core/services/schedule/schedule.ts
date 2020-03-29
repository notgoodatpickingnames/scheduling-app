import { Shift } from "~/app/core/services/shift/shift";
import { User } from "~/app/core/services/account/user";
import { ISchedule } from "./ISchedule";

export class Schedule {
    public scheduleId: string;
    public shiftId: string;
    public userIds: string[] = [];

    constructor(schedule: ISchedule, id: string) {
        this.scheduleId = id;
        this.shiftId = schedule.shiftId;
        this.userIds = schedule.userIds;
    }

    public asInterface(): ISchedule {
        return {
            shiftId: this.shiftId ? this.shiftId : "",
            userIds: this.userIds ? this.userIds : []
        }
    }
}