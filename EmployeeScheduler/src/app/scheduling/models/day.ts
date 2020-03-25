import { DatePipe } from "@angular/common";
import { Shift } from "~/app/core/services/shift/shift";

export class Day {
    public date: Date;
    public name: string;
    public dayOfMonth: string;
    public shifts: Shift[];

    private datePipe = new DatePipe('en');

    private conflict: boolean;
    private noShift: boolean;
    private warning: boolean;
    private allMet: boolean;

    constructor(date: Date) {
        this.date = date;
        this.name = this.datePipe.transform(this.date, 'EEEEEE');
        this.dayOfMonth = this.date.getDate().toString();


        const min = Math.ceil(0);
        const max = Math.floor(3);
        const random = Math.floor(Math.random() * (max - min + 1)) + min;

        switch(random) {
            case 0: this.conflict = true;
                break;
            case 1: this.noShift = true;
                break;
            case 2: this.warning = true;
                break;
            case 3: this.allMet = true;
                break;
            default: this.allMet = true;
                break;
        }
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