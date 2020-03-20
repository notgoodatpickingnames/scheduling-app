import { Week } from "./week";

export class Year {
    public weeks: Week[] = [];
    public year: number;

    private firstSundayOfYear: Date;
    private january = 0;

    constructor(year: number) {
        this.year = year;
        this.firstSundayOfYear = this.getFirstSundayOfYear();

        this.buildWeeks();
    }

    private getFirstSundayOfYear(): Date {
        const firstOfTheMonth = new Date(this.year, this.january, 1);
        const firstSunday = new Date(this.year, this.january, firstOfTheMonth.getDate() - firstOfTheMonth.getDay());
        return firstSunday;
    }

    private buildWeeks(): void {
        let weekToAdd = new Week(this.firstSundayOfYear);
        this.weeks.push(weekToAdd);

        do {
            const lastDayOfLastWeek = weekToAdd.endDate;
            const newStartOfWeek = new Date(lastDayOfLastWeek.getFullYear(), lastDayOfLastWeek.getMonth(), lastDayOfLastWeek.getDate() + 1);
            weekToAdd = new Week(newStartOfWeek);
            this.weeks.push(weekToAdd);
        } while (weekToAdd.endDate.getFullYear() === this.year);
    }
}
