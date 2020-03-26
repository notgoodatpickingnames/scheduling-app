import { Component, OnInit } from '@angular/core';
import { Month } from './models/month';
import { ShiftsService } from '../core/services/shift/shifts.service';
import { SubscriptionBase } from '../core/subscriptionBase';
import { Shift } from '../core/services/shift/shift';

@Component({
    selector: 'ns-scheduling',
    templateUrl: './scheduling.component.html',
    styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent extends SubscriptionBase {
    private today = new Date();
    private shifts: Shift[] = [];
    public month = new Month(this.today.getFullYear(), this.today.getMonth(), this.shifts);

    constructor(private shiftService: ShiftsService) {
        super();

    }

    public get nameOfMonth(): string {
        return this.month.name;
    }

    public onNextMonthClick() {
        this.month = new Month(this.month.year, this.month.monthNumber + 1, this.shifts);
    }

    public onPreviousMonthClick() {
        this.month = new Month(this.month.year, this.month.monthNumber - 1, this.shifts);
    }

    private listenForShifts(): void {
        this.shiftService.shift$
    }
}
