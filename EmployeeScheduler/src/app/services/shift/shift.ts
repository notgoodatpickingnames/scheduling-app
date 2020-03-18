import { ShiftTime } from "~/app/FieldComponents/shiftTimePicker/shiftTime";
import { IShift } from "./IShift";
import { UUID } from "~/app/core/UUID";

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
        this.employeeCount = shift.employeeCount;
        this.notes = shift.notes;

        this.dayOfWeek = shift.dayOfWeek;
        this.dayOfMonth = shift.dayOfMonth;
        this.dayOfTheYear = shift.dayOfTheYear ? new Date(shift.dayOfTheYear) : undefined;
    }

    public static constructNew(): Shift {
        return new Shift({
            shiftId: UUID.constructNew(),
            startTime: ShiftTime.constructNew(),
            endTime: ShiftTime.constructNew(),
            employeeCount: undefined,
            notes: undefined,
            dayOfWeek: undefined,
            dayOfMonth: undefined,
            dayOfTheYear: undefined
        })
    }
}