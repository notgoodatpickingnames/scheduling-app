import { DatePipe } from "@angular/common";
import { Shift } from "~/app/core/services/shift/shift";

export class Day {
    public date: Date;
    public name: string;
    public dayOfMonth: string;
    public shifts: Shift[];

    private datePipe = new DatePipe('en');

    private conflict: boolean;
    private noShift: boolean = true;
    private warning: boolean;
    private allMet: boolean;

    constructor(date: Date, shifts: Shift[]) {
        this.date = date;
        this.name = this.datePipe.transform(this.date, 'EEEEEE');
        this.dayOfMonth = this.date.getDate().toString();
    }

    public get hasConflict(): boolean {
        return this.conflict;
    }

    public get hasAllShiftsMet(): boolean {
        return this.allMet;
    }

    public get hasNoShifts(): boolean {
        return this.noShift;
    }

    public get hasWarning(): boolean {
        return this.warning;
    }
}