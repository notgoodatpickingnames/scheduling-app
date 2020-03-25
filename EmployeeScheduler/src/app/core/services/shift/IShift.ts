import { RecurrenceType } from "./recurrenceType";
import { ShiftTime } from "~/app/core/FormComponents/shiftTimePicker/shiftTime";

export interface IShift {
    recurrenceType: RecurrenceType;
    startTime: ShiftTime;
    endTime: ShiftTime;
    employeeCount: string;
    notes: string;

    dayOfWeek: string;
    dayOfMonth: string;
    dayOfTheYear: string;
}
