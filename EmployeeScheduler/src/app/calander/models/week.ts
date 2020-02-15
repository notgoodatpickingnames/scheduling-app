import { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } from "../days";
import { Day } from "./day";

export class Week {
    public daysOfTheWeek: string[] = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday];
    public days: Day[] = [];

    constructor(startDate: Date) { // The start date should be a sunday no matter what.
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
            const day = new Day(date);
            this.days.push(day);
        }
    }

    public buildFromAnyDayInWeek(startDate: Date) {
        // from start date add previous days
        for (let i = 0; i < startDate.getDay(); i++) {
            const dateToAdd = new Date(startDate.toString());
            dateToAdd.setDate(dateToAdd.getDate() - (startDate.getDay() + i));
            //this.days.push(dateToAdd);
        }

        // Add start date
        //this.days.push(startDate);

        // Add remaining days
        for (let i = startDate.getDay(); i < 6; i++) {
            let dateToAdd = new Date(startDate.toString());
            dateToAdd.setDate(dateToAdd.getDate() + (i - startDate.getDay()));
            //this.days.push(dateToAdd);
        }
    }

    public getDayOfWeek(day: number) {
        return this.daysOfTheWeek[day];
    }
}