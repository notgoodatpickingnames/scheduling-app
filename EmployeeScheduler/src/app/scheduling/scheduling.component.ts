import { Component, OnInit } from '@angular/core';
import { Month } from './models/month';

@Component({
    selector: 'ns-scheduling',
    templateUrl: './scheduling.component.html',
    styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent {
    private today = new Date();
    public month = new Month(this.today.getFullYear(), this.today.getMonth());

    public get nameOfMonth(): string {
        return this.month.name;
    }

    public onNextMonthClick() {
        this.month = new Month(this.month.year, this.month.month + 1);
    }

    public onPreviousMonthClick() {
        this.month = new Month(this.month.year, this.month.month - 1);
    }
}
