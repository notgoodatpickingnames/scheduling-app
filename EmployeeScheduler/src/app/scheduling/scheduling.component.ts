import { Component, OnInit } from '@angular/core';
import { Month } from './models/month';
import { ShiftsService } from '../core/services/shift/shifts.service';
import { SubscriptionBase } from '../core/subscriptionBase';
import { Shift } from '../core/services/shift/shift';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ns-scheduling',
    templateUrl: './scheduling.component.html',
    styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent extends SubscriptionBase {
    private today = new Date();
    public month = new Month(this.today.getFullYear(), this.today.getMonth(), this.shiftService.shift$);

    constructor(private shiftService: ShiftsService) {
        super();

    }

    public get nameOfMonth(): string {
        return this.month.name;
    }

    public onNextMonthClick() {
        this.month = new Month(this.month.year, this.month.monthNumber + 1, this.shiftService.shift$);
    }

    public onPreviousMonthClick() {
        this.month = new Month(this.month.year, this.month.monthNumber - 1, this.shiftService.shift$);
    }
}
