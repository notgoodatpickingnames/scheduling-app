import { ShiftTime } from "~/app/FormComponents/shiftTimePicker/shiftTime";
import { ShiftType } from "./shiftType";

export interface IShift {
    type: ShiftType;
    startTime: ShiftTime;
    endTime: ShiftTime;
    employeeCount: string;
    notes: string;

    dayOfWeek: string;
    dayOfMonth: string;
    dayOfTheYear: string;
}