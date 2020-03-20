import { Week } from "./week";
import { DatePipe } from "@angular/common";

export class Month {
    public weeks: Week[];
    public name: string;

    private year: number;
    private month: number;
    private firstSunday: Date;
    private lastSaturday: Date;
    private datePipe = new DatePipe('en');

    constructor(year: number, month: number) {
        this.firstSunday = this.getFirstSunday();
        this.lastSaturday = this.getLastSaturday();

        this.buildWeeks;

        this.name = this.datePipe.transform(new Date(year, month, 1), 'MMMM');
    }

    private buildWeeks(): void {
        let weekToAdd = new Week(this.firstSunday);
        this.weeks.push(weekToAdd);

        do {
            const lastDayOfLastWeek = weekToAdd.endDate;
            const newStartOfWeek = new Date(lastDayOfLastWeek.getFullYear(), lastDayOfLastWeek.getMonth(), lastDayOfLastWeek.getDate() + 1);
            weekToAdd = new Week(newStartOfWeek);
            this.weeks.push(weekToAdd);
        } while (weekToAdd.startDate.getMonth() === this.month);
    }

    private getFirstSunday(): Date {
        const firstOfTheMonth = new Date(this.year, this.month, 1);
        const firstSunday = new Date(this.year, this.month, firstOfTheMonth.getDate() - firstOfTheMonth.getDay());
        return firstSunday;
    }

    private getLastSaturday(): Date {
        const lastOfMonth = new Date(this.year, this.month + 1, 0);
        const lastSaturdayOfMonth = new Date(2020, 2, lastOfMonth.getDate() + (7 - lastOfMonth.getDay()));
        return lastSaturdayOfMonth;
    }
}
