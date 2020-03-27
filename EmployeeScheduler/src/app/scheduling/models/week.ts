import { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } from "~/app/core/days";
import { Day } from "./day";
import { Shift } from "~/app/core/services/shift/shift";


export class Week {
    public daysOfTheWeek: string[] = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday];
    public days: Day[] = [];

    constructor(startDate: Date, shifts: Shift[]) {
        const shiftsForThisWeek = this.filterForThisWeeksShifts(shifts);
        this.buildDays(startDate, shiftsForThisWeek);
    }

    public getDayOfWeek(day: number) {
        return this.daysOfTheWeek[day];
    }

    private buildDays(startDate: Date, shiftsForThisWeek: Shift[]) {
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + dayOfWeek);
            const shiftsOnThisDay = shiftsForThisWeek.filter(shift => this.isShiftInDay(shift, date, dayOfWeek));
            const day = new Day(date, shiftsOnThisDay);
            this.days.push(day);
        }
    }

    private filterForThisWeeksShifts(shifts: Shift[]): Shift[] {
        const filteredShifts = shifts.filter(shift => shift);
        return filteredShifts;
    }

    private isShiftInWeek(shift: Shift, ) {

    }

    private isShiftInDay(shift: Shift, date: Date, dayOfWeek: number): boolean {
        return shift.dayOfTheYear === date || shift.dayOfMonth === date.getDay() || shift.dayOfWeek === dayOfWeek;
    }
}