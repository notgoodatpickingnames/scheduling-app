import { IShift } from "./IShift";
import { UUID } from "~/app/core/UUID";
import { NanRemover } from "~/app/core/nanRemover";
import { ShiftTime } from "~/app/FormComponents/shiftTimePicker/shiftTime";
import { DatePipe } from "@angular/common";
import { ShiftType } from "./shiftType";

export class Shift {
    public shiftId: string;
    public type: ShiftType;

    public startTime: ShiftTime;
    public endTime: ShiftTime;
    public employeeCount: number;
    public notes: string;

    // There can either be a day of the week or a day of the month or a day of the year.
    public dayOfWeek: number; // Happens every week.
    public dayOfMonth: number; // Happens every month.
    public dayOfTheYear: Date; // Happens every year.
    
    private datePipe = new DatePipe('en');

    constructor(shift: IShift) {
        this.shiftId = shift.shiftId;
        this.type = shift.type;
        this.startTime = shift.startTime;
        this.endTime = shift.endTime;
        this.employeeCount = shift.employeeCount ? NanRemover.removeNAN(shift.employeeCount) : undefined;
        this.notes = shift.notes;

        this.dayOfWeek = shift.dayOfWeek ? NanRemover.removeNAN(shift.dayOfWeek) : undefined;
        this.dayOfMonth = shift.dayOfMonth ? NanRemover.removeNAN(shift.dayOfMonth) : undefined;
        this.dayOfTheYear = shift.dayOfTheYear ? new Date(shift.dayOfTheYear) : undefined;
    }

    public static constructNew(): Shift {
        return new Shift({
            shiftId: UUID.constructNew(),
            type: ShiftType.Unknown,
            startTime: ShiftTime.constructNew(),
            endTime: ShiftTime.constructNew(),
            employeeCount: '',
            notes: '',
            dayOfWeek: '',
            dayOfMonth: '',
            dayOfTheYear: ''
        })
    }

    public asInterface() : IShift {
        return {
            shiftId: this.shiftId ? this.shiftId : UUID.constructNew(),
            type: this.type ? this.type : ShiftType.Unknown,
            startTime: this.startTime ? this.startTime : ShiftTime.constructNew(),
            endTime: this.endTime ? this.endTime : ShiftTime.constructNew(),
            employeeCount: this.employeeCount ? this.employeeCount.toString() : "",
            notes: this.notes,
            dayOfWeek: this.dayOfWeek ? this.dayOfWeek.toString() : "",
            dayOfMonth: this.dayOfMonth ? this.dayOfMonth.toString() : "",
            dayOfTheYear: this.dayOfTheYear ? this.dayOfTheYear.toString() : ""
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