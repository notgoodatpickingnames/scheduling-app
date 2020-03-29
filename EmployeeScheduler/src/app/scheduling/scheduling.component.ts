import { Component, OnInit } from '@angular/core';
import { Month } from './models/month';
import { ShiftsService } from '../core/services/shift/shifts.service';
import { SubscriptionBase } from '../core/subscriptionBase';
import { Shift } from '../core/services/shift/shift';
import { takeUntil } from 'rxjs/operators';
import { Day } from './models/day';
import { SchedulesService } from '../core/services/schedule/schedules.service';

@Component({
    selector: 'ns-scheduling',
    templateUrl: './scheduling.component.html',
    styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent extends SubscriptionBase {
    private today = new Date();
    private selectedMonthNumber: number = this.today.getMonth();
    private selectedYear: number = this.today.getFullYear();
    
    public previousMonth = new Month(this.today.getFullYear(), this.today.getMonth(), this.shiftsService.shift$, this.schedulesService.schedule$);
    public selectedMonth = new Month(this.today.getFullYear(), this.today.getMonth(), this.shiftsService.shift$, this.schedulesService.schedule$);
    public nextMonth = new Month(this.today.getFullYear(), this.today.getMonth(), this.shiftsService.shift$, this.schedulesService.schedule$);

    constructor(private shiftsService: ShiftsService,
        private schedulesService: SchedulesService) {
        super();

        this.selectedMonth = new Month(this.selectedYear,
            this.selectedMonthNumber,
            this.shiftsService.shift$,
            this.schedulesService.schedule$);
    }

    public get nameOfMonth(): string {
        return this.selectedMonth.name;
    }

    public onDayTap(day: Day): void {
        if (day.date.getMonth() === this.selectedMonthNumber) {
            alert('the tapped day is in this month. moving to summary view');
        }

        if (day.date.getMonth() > this.selectedMonthNumber) {
            alert('the tapped day is in the next month. firing animation into next month');
        }

        if (day.date.getMonth() < this.selectedMonthNumber) {
            alert('the tapped day is in the previous month. firing animation into previous month');
        }
    }

    public onNextMonthTap(): void {
        this.moveToPreviousMonth();
    }

    public onPreviousMonthTap(): void {
        this.moveToPreviousMonth();
    }

    private moveToNextMonth(): void {

    }

    private moveToPreviousMonth(): void {

    }
}
