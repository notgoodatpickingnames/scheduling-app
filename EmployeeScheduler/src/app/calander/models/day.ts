import { DatePipe } from "@angular/common";

export class Day {
    public date: Date;
    public name: string;
    public dayOfMonth: string;

    private datePipe = new DatePipe('en');

    constructor(date: Date) {
        this.date = date;
        this.name = this.datePipe.transform(this.date, 'EEEEEE');
        this.dayOfMonth = this.date.getDate().toString();
    }
}