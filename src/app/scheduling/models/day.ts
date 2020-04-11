import { DatePipe } from "@angular/common";
import { Shift } from "~/app/core/services/shift/shift";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { EventEmitter } from "@angular/core";
import { SubscriptionBase } from "~/app/core/subscriptionBase";
import { takeUntil } from "rxjs/operators";
import { DayStates } from "../dayStates";
import { RecurrenceType } from "~/app/core/services/shift/recurrenceType";
import { Schedule } from "../../core/services/schedule/schedule";

export class Day extends SubscriptionBase {
    public date: Date;
    public name: string;
    public dayOfMonth: number;
    public shifts: Shift[] = [];
    public schedules: Schedule[] = [];

    private datePipe = new DatePipe('en');

    constructor(date: Date) {
        super();
        this.date = date;
        this.name = this.datePipe.transform(this.date, 'EEEEEE');
        this.dayOfMonth = this.date.getDate();
    }

    public get monthNumber(): number {
        return this.date.getMonth();
    }
}
