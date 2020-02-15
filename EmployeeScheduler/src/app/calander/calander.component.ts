import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { CalanderContext } from './calanderContext';
import { MonthComponent } from './month/month.component';

@Component({
    selector: 'ns-calander',
    templateUrl: './calander.component.html',
    styleUrls: ['./calander.component.css']
})
export class CalanderComponent implements OnInit {
    @ViewChild(MonthComponent, {read: MonthComponent, static: false}) public monthComponent: MonthComponent;

    @Input() public context: CalanderContext = CalanderContext.Month;
    @Input() public set date(date: Date) {
        if (date!== this._date) {
            this._date = date;
            this.dateChange.emit(this._date);
        }
    }
    @Output() public dateChange = new EventEmitter<Date>();

    public get date(): Date {
        return this._date;
    }
    // Inputs a date to go to.
    // outputs data about what date we are on and what context we are in.

    private _date: Date = new Date();
    
    constructor() {
    }

    ngOnInit() {
    }

    public switchContext(context: CalanderContext) {
        // Do context based stuff.
    }

    public get isYearContext() {
        return this.context == CalanderContext.Year;
    }

    public get isMonthContext() {
        return this.context == CalanderContext.Month;
    }

    public get isWeekContext() {
        return this.context == CalanderContext.Week;
    }

    public get isDayContext() {
        return this.context == CalanderContext.Day;
    }
}
