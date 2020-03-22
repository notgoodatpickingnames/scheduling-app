import { TimeResponse } from "nativescript-modal-datetimepicker";
import { DatePipe } from "@angular/common";

export class ShiftTime implements TimeResponse{
    public hour: number;
    public minute: number;

    constructor(hour: number, minute: number) {
        this.hour = hour;
        this.minute = minute;
    }

    public static constructNew(): ShiftTime {
        return new ShiftTime(undefined, undefined);
    }
}
