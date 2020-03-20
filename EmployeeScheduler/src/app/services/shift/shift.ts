import { IShift } from "./IShift";
import { UUID } from "~/app/core/UUID";
import { NanRemover } from "~/app/core/nanRemover";
import { ShiftTime } from "~/app/FormComponents/shiftTimePicker/shiftTime";

export class Shift {
    public shiftId: string;
    public startTime: ShiftTime;
    public endTime: ShiftTime;
    public employeeCount: number;
    public notes: string;

    // There can either be a day of the week or a day of the month or a day of the year.
    public dayOfWeek: number; // Happens every week.
    public dayOfMonth: number; // Happens every month.
    public dayOfTheYear: Date; // Happens every year.

    constructor(shift: IShift) {
        this.shiftId = shift.shiftId;
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
            startTime: this.startTime ? this.startTime : ShiftTime.constructNew(),
            endTime: this.endTime ? this.endTime : ShiftTime.constructNew(),
            employeeCount: this.employeeCount ? this.employeeCount.toString() : "",
            notes: this.notes,
            dayOfWeek: this.dayOfWeek ? this.dayOfWeek.toString() : "",
            dayOfMonth: this.dayOfMonth ? this.dayOfMonth.toString() : "",
            dayOfTheYear: this.dayOfTheYear.toString()
        };
    }
}