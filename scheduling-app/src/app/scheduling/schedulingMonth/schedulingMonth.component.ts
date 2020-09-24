import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Day } from '../models/day';
import { Month } from '../models/month';

@Component({
    selector: 'ns-scheduling-month',
    templateUrl: './schedulingMonth.component.html',
    styleUrls: ['./schedulingMonth.component.css']
})
export class SchedulingMonthComponent {
    @Input() public month: Month;
    @Output() public onNextMonthTap = new EventEmitter();
    @Output() public onThisMonthDayTap = new EventEmitter<Day>();
    @Output() public onPreviousMonthTap = new EventEmitter();

    public onDayTap(day: Day): void {
        if (day.date.getMonth() === this.monthNumber) {
           this.onThisMonthDayTap.emit(day);
        }

        if (day.date.getMonth() > this.monthNumber) {
            this.onNextMonthTap.emit();
        }

        if (day.date.getMonth() < this.monthNumber) {
            this.onPreviousMonthTap.emit();
        }
    }

    public get monthNumber(): number {
        return this.month.monthNumber;
    }
}
