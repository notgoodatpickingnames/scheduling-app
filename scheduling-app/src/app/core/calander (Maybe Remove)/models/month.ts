import { Week } from "./week";
import { DatePipe } from "@angular/common";

export class Month {
    public weeks: Week[] = [];
    public month: number;
    public year: number;
    public name: string;

    private datePipe = new DatePipe('en');

    constructor(year: number, month: number) {
        this.month = month;
        this.year = year;
        this.name = this.datePipe.transform(new Date(year, month, 1), 'MMMM');

        this.buildWeeks();
    }

    public get numberOfDays() {
        return new Date(this.year, this.month + 1, 0).getDate();
    }

    private buildWeeks() {
        const firstOfTheMonth = new Date(this.year, this.month, 1);
        const firstSunday = new Date(this.year, this.month, firstOfTheMonth.getDate() - firstOfTheMonth.getDay());

        for (let i = 0; i < this.numberOfDays; i += 7) {
            this.weeks.push(new Week(new Date(firstSunday.getFullYear(), firstSunday.getMonth(), firstSunday.getDate() + i)));
        }
    }

}