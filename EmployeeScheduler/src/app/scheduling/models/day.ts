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
    public stateChange = new EventEmitter<DayStates>();

    private datePipe = new DatePipe('en');
    private state = DayStates.normal;

    constructor(date: Date, shift$: Observable<Shift[]>, schedule$: Observable<Schedule[]>) {
        super();
        this.date = date;
        this.name = this.datePipe.transform(this.date, 'EEEEEE');
        this.dayOfMonth = this.date.getDate();
        this.listenForData(shift$, schedule$);
        this.stateChange.emit(this.state);
    }

    private listenForData(shift$: Observable<Shift[]>, schedule$: Observable<Schedule[]>): void {
        combineLatest(shift$, schedule$).pipe(takeUntil(this.componentDestroyed)).subscribe(data => {
            const shifts = data[0];
            const schedules = data[1];
            this.shifts = this.filterShifts(shifts);
            this.schedules = this.filterSchedules(schedules);
            this.setState();
        });
    }

    private filterShifts(shifts: Shift[]): Shift[] {
        return shifts.filter(shift => this.isShiftOnDay(shift));
    }

    private filterSchedules(schedules: Schedule[]): Schedule[] {
        return schedules.filter(schedule => schedule.date === this.date)
    }

    private setState(): void {
        if (this.shifts.length > 0) {
            if (this.someShiftsHaveNoSchedule()) {
                this.state = DayStates.warning;
                this.stateChange.emit(this.state);
            }
        }
    }

    private someShiftsHaveNoSchedule(): boolean {
        return this.shifts.some(shift => !this.schedules.find(schedule => shift.shiftId === schedule.shiftId));
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
