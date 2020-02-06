import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ns-yourSchedule',
    templateUrl: './yourSchedule.component.html',
    styleUrls: ['./yourSchedule.component.css']
})
export class YourScheduleComponent implements OnInit {
    public currentDate = new Date();

    constructor() {}

    ngOnInit() {
    }

    public get numberOfDaysInMonth(): number {
        return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
    }

    public selectedMonth(): number {
        return this.currentDate.getMonth();
    }

    public nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }

    public previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }
}
