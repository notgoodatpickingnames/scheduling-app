import { ShiftTime } from "~/app/FieldComponents/shiftTimePicker/shiftTime";

export interface IShift {
    shiftId: string;
    startTime: ShiftTime;
    endTime: ShiftTime;
    employeeCount: string;
    notes: string;

    dayOfWeek: string;
    dayOfMonth: string;
    dayOfTheYear: string;
}