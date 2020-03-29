import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Day } from '../models/day';
import { Label } from '@nativescript/core/ui';
import { StackLayout } from '@nativescript/core/ui';
import { Page } from '@nativescript/core/ui';
import { Color } from 'tns-core-modules/color/color';
import { DayStates } from '../dayStates';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SubscriptionBase } from '~/app/core/subscriptionBase';
import { successColor, mainBgColor, errorColor, warningColor } from '~/app/core/colors';
import { View } from 'tns-core-modules/ui/core/view/view';
import { Shift } from '~/app/core/services/shift/shift';
import { Schedule } from '~/app/core/services/schedule/schedule';
import { RecurrenceType } from '~/app/core/services/shift/recurrenceType';
import { ShiftsService } from '~/app/core/services/shift/shifts.service';
import { SchedulesService } from '~/app/core/services/schedule/schedules.service';

@Component({
    selector: 'ns-scheduling-day',
    templateUrl: './schedulingDay.component.html',
    styleUrls: ['./schedulingDay.component.css']
})
export class SchedulingDayComponent extends SubscriptionBase {
    @ViewChild('label', {read: ElementRef, static: false}) public set labelRef(labelRef: ElementRef) {
        this.labelView = <View>labelRef.nativeElement;
    }
    @ViewChild('labelContainer', {read: ElementRef, static: false}) public set containerRef(containerRef: ElementRef) {
        this.containerView = <View>containerRef.nativeElement;
        setTimeout(() => this.listenForData(), 10);
    }

    @Input() public set day(day: Day) {
        this._day = day;
        setTimeout(() => this.listenForData(), 10);
    }
    @Input() public monthNumber: number;
    @Output() public onDayTap = new EventEmitter<Day>();

    public get isDayInMonth(): boolean {
        if (this.day && this.monthNumber) {
            return this.day.date.getMonth() === this.monthNumber;
        }

        return false;
    }

    public get day(): Day {
        return this._day;
    }

    public shifts: Shift[] = [];
    public schedules: Schedule[] = [];

    private _day: Day;
    private dayState = DayStates.normal;
    private labelView: View;
    private containerView: View;

    private static dataListener: Subscription;

    constructor(private shiftsService: ShiftsService,
        private schedulesService: SchedulesService,
        private page: Page) {
        super();

        this.page.on(Page.unloadedEvent, event => {
            this.ngOnDestroy();
        });

        this.page.on(Page.loadedEvent, event => {
            // this.listenForData();
        });
    }

    public onTap(): void {
        this.onDayTap.emit(this.day);
    }

    private listenForData(): void {
        if (SchedulingDayComponent.dataListener !== undefined) {
            SchedulingDayComponent.dataListener.unsubscribe;
        }
        
        SchedulingDayComponent.dataListener = combineLatest(this.shiftsService.shift$,
                this.schedulesService.schedule$
            ).pipe(takeUntil(this.componentDestroyed)).subscribe(data => {
                const shifts = data[0];
                const schedules = data[1];
                this.shifts = this.filterShifts(shifts);
                this.schedules = this.filterSchedules(schedules);
                this.dayState = this.getState();
                this.onStateChange();
        });
    }

    private filterShifts(shifts: Shift[]): Shift[] {
        return shifts.filter(shift => this.isShiftOnDay(shift));
    }

    private filterSchedules(schedules: Schedule[]): Schedule[] {
        return schedules.filter(schedule => schedule.date === this.day.date)
    }

    private getState(): DayStates {
        if (this.someShiftsHaveNoSchedule()) {
            return DayStates.warning;
        }

        return DayStates.normal;
    }

    private someShiftsHaveNoSchedule(): boolean {
        return this.shifts.some(shift => !this.schedules.find(schedule => shift.shiftId === schedule.shiftId));
    }

    private isShiftOnDay(shift: Shift,): boolean {
        
        switch(shift.recurrenceType) {
            case RecurrenceType.EveryWeek: return this.day.date.getDay() === shift.dayOfWeek;
            case RecurrenceType.EveryMonth: return this.day.dayOfMonth === shift.dayOfMonth;
            case RecurrenceType.EveryYear:  return this.day.date.getMonth() === shift.dayOfTheYear.getMonth()
                && this.day.date.getDate() === shift.dayOfTheYear.getDate();
            case RecurrenceType.OneTime: return this.day.date.toDateString() === shift.dayOfTheYear.toDateString();
            default: return false;
        }
    }

    private onStateChange(): void {
        if (this.isDayInMonth) {
            switch(this.dayState) {
                case DayStates.normal: this.animateToNormal();
                    break;
                case DayStates.conflict: this.animateToConflict();
                    break;
                case DayStates.warning: this.animateToWarning();
                    break;
                case DayStates.allConditionsMet: this.animateToAllConditionsMet();
                    break;
                default: break;
            }
        }
    }

    private animateToNormal() {
        this.animateBackgroundColor(this.containerView, mainBgColor);
    }

    private animateToConflict() {
        this.animateBackgroundColor(this.containerView, errorColor);
    }

    private animateToWarning() {
        this.animateBackgroundColor(this.containerView, warningColor);
    }

    private animateToAllConditionsMet() {
        this.animateBackgroundColor(this.containerView, successColor);
    }

    private animateBackgroundColor(view: View, color: Color) {
        if (view !== undefined) {
            view.animate({
                backgroundColor: color,
                duration: 1000
            });
        }
    }
}
