import { Week } from "./week";

export class Month {
    public weeks: Week[] = [];
    public month: number;
    public year: number;

    constructor(year: number, month: number) {
        this.month = month;
        this.year = year;
        const firstOfTheMonth = new Date(this.year, this.month, 1);
        console.log('yeet', firstOfTheMonth.toUTCString());
        const firstSunday = new Date(this.year, this.month, firstOfTheMonth.getDate() - firstOfTheMonth.getDay());
        console.log('yeet 2', firstSunday.getDay());
        for (let i = 0; i < this.numberOfDays; i+=7) {
            this.weeks.push(new Week(new Date(firstSunday.getFullYear(), firstSunday.getMonth(), firstSunday.getDate() + i)));
        }

        this.weeks.forEach(w => {
            w.days.forEach(d => {
                console.log(d.toUTCString());
            });
        });
    }

    public get numberOfDays() {
        return new Date(this.year, this.month + 1, 0).getDate();
    }

}