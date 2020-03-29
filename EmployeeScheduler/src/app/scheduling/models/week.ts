import { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } from "~/app/core/days";
import { Day } from "./day";
import { Shift } from "~/app/core/services/shift/shift";
import { Observable } from "rxjs";
import { Schedule } from "~/app/core/services/schedule/schedule";


export class Week {
    public daysOfTheWeek: string[] = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday];
    public days: Day[] = [];

    constructor(startDate: Date, shift$: Observable<Shift[]>, schedule$: Observable<Schedule[]>) {
        this.buildDays(startDate, shift$, schedule$);
    }

    public getDayOfWeek(day: number) {
        return this.daysOfTheWeek[day];
    }

    private buildDays(startDate: Date, shift$: Observable<Shift[]>, schedule$: Observable<Schedule[]>) {
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + dayOfWeek);
            
            const day = new Day(date, shift$, schedule$);
            this.days.push(day);
        }
    }
}