import { DatePipe } from "@angular/common";
import { Shift } from "~/app/core/services/shift/shift";
import { BehaviorSubject, Observable } from "rxjs";
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
    public schedule: Schedule;
    public stateChange = new EventEmitter<DayStates>();

    private datePipe = new DatePipe('en');
    private state = DayStates.normal;

    constructor(date: Date, shifts: Observable<Shift[]>) {
        super();
        this.date = date;
        this.name = this.datePipe.transform(this.date, 'EEEEEE');
        this.dayOfMonth = this.date.getDate();
        this.listenForShifts(shifts);
        this.stateChange.emit(this.state);
    }

    private listenForShifts(shifts: Observable<Shift[]>): void {
        shifts.pipe(takeUntil(this.componentDestroyed)).subscribe(shifts => {
            this.shifts = this.filterShifts(shifts);
            this.setState();
        });
    }

    private filterShifts(shifts: Shift[]): Shift[] {
        return shifts.filter(shift => this.isShiftOnDay(shift));
    }

    private setState(): void {
        if (this.shifts.length > 0) {

        }
    }

    private isShiftOnDay(shift: Shift): boolean {
        switch(shift.recurrenceType) {
            case RecurrenceType.EveryWeek: return this.date.getDay() === shift.dayOfWeek;
            case RecurrenceType.EveryMonth: return this.dayOfMonth === shift.dayOfMonth;
            case RecurrenceType.EveryYear:  return this.date.getMonth() === shift.dayOfTheYear.getMonth()
                && this.date.getDate() === shift.dayOfTheYear.getDate();
            case RecurrenceType.OneTime: return this.date === shift.dayOfTheYear;
            default: return false;
        }
    }

    public get monthNumber(): number {
        return this.date.getMonth();
    }
}