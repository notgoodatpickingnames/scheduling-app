import { Week } from "./week";
import { DatePipe } from "@angular/common";
import { Shift } from "~/app/core/services/shift/shift";
import { Observable } from "rxjs";
import { SubscriptionBase } from "~/app/core/subscriptionBase";
import { takeUntil } from "rxjs/operators";
import { RecurrenceType } from "~/app/core/services/shift/recurrenceType";

export class Month extends SubscriptionBase {
    public weeks: Week[] = [];
    public monthNumber: number;
    public year: number;
    public name: string;

    private datePipe = new DatePipe('en');

    constructor(year: number, monthNumber: number, shift$: Observable<Shift[]>) {
        super();

        this.monthNumber = monthNumber;
        this.year = year;
        this.name = this.datePipe.transform(new Date(year, monthNumber, 1), 'MMMM');
        this.listenForShifts(shift$);
    }

    public get numberOfDays() {
        return new Date(this.year, this.monthNumber + 1, 0).getDate();
    }

    private listenForShifts(shift$: Observable<Shift[]>): void {
        this.buildWeeks(shift$);
    }

    private buildWeeks(shifts: Observable<Shift[]>) {
        const firstOfTheMonth = new Date(this.year, this.monthNumber, 1);
        const firstSunday = new Date(this.year, this.monthNumber, firstOfTheMonth.getDate() - firstOfTheMonth.getDay());

        for (let i = 0; i < this.numberOfDays; i += 7) {
            const newWeekStartDate = new Date(firstSunday.getFullYear(), firstSunday.getMonth(), firstSunday.getDate() + i);
            this.weeks.push(new Week(newWeekStartDate, shifts));
        }
    }
}
