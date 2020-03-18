import { ShiftTime } from "~/app/FieldComponents/shiftTimePicker/shiftTime";

export interface IShift {
    shiftId: string;
    startTime: ShiftTime;
    endTime: ShiftTime;
    employeeCount: number;
    notes: string;

    dayOfWeek: number;
    dayOfMonth: number;
    dayOfTheYear: string;
}