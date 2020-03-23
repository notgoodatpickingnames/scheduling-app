import { IShift } from "./IShift";
import { UUID } from "~/app/core/UUID";
import { NanRemover } from "~/app/core/nanRemover";
import { ShiftTime } from "~/app/FormComponents/shiftTimePicker/shiftTime";
import { DatePipe } from "@angular/common";
import { ShiftType } from "./shiftType";

export class Shift {
    public type: ShiftType;

    public startTime: ShiftTime;
    public endTime: ShiftTime;
    public employeeCount: number;
    public notes: string;

    // There can either be a day of the week or a day of the month or a day of the year.
    public dayOfWeek: number; // Happens every week.
    public dayOfMonth: number; // Happens every month.
    public dayOfTheYear: Date; // Happens every year.

    public id: string;

    private datePipe = new DatePipe('en');

    constructor(shift: IShift, id: string) {
        this.id = id;
        this.type = shift.type;
        this.startTime = shift.startTime;
        this.endTime = shift.endTime;
        this.employeeCount = shift.employeeCount !== undefined ? NanRemover.removeNAN(shift.employeeCount) : undefined;
        this.notes = shift.notes;

        this.dayOfWeek = shift.dayOfWeek !== undefined ? NanRemover.removeNAN(shift.dayOfWeek) : undefined;
        this.dayOfMonth = shift.dayOfMonth !== undefined ? NanRemover.removeNAN(shift.dayOfMonth) : undefined;
        this.dayOfTheYear = shift.dayOfTheYear !== undefined ? new Date(shift.dayOfTheYear) : undefined;
    }

    public static constructNew(): Shift {
        return new Shift({
            type: ShiftType.Unknown,
            startTime: ShiftTime.constructNew(),
            endTime: ShiftTime.constructNew(),
            employeeCount: '',
            notes: '',
            dayOfWeek: '',
            dayOfMonth: '',
            dayOfTheYear: ''
        },
        undefined)
    }

    public asInterface() : IShift {
        return {
            type: this.type !== undefined ? this.type : ShiftType.Unknown,
            startTime: this.startTime ? this.startTime : ShiftTime.constructNew(),
            endTime: this.endTime ? this.endTime : ShiftTime.constructNew(),
            employeeCount: this.employeeCount !== undefined ? this.employeeCount.toString() : "",
            notes: this.notes,
            dayOfWeek: this.dayOfWeek !== undefined ? this.dayOfWeek.toString() : "",
            dayOfMonth: this.dayOfMonth !== undefined ? this.dayOfMonth.toString() : "",
            dayOfTheYear: this.dayOfTheYear !== undefined ? this.dayOfTheYear.toString() : ""
        };
    }

    public get startTimeAsString(): string {
        if (this.startTime) {
            const startTimeAsDate = new Date(1, 1, 1, this.startTime.hour, this.startTime.minute);
            return this.datePipe.transform(startTimeAsDate, 'shortTime');
        }

        return undefined;
    }

    public get endTimeAsString(): string {
        if (this.endTime) {
            const endTimeAsDate = new Date(1, 1, 1, this.endTime.hour, this.endTime.minute);
            return this.datePipe.transform(endTimeAsDate, 'shortTime');
        }

        return undefined;
    }
}
