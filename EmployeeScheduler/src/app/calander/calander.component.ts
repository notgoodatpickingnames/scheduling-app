import { Component, OnInit, Output, Input } from '@angular/core';
import { CalanderContext } from './calanderContext';

@Component({
    selector: 'ns-calander',
    templateUrl: './calander.component.html',
    styleUrls: ['./calander.component.css']
})
export class CalanderComponent implements OnInit {
    private _defaultContext = CalanderContext.Year;

    @Input() public context: CalanderContext = this._defaultContext;
    
    // Inputs a date to go to.
    // outputs data about what date we are on and what context we are in.

    constructor() { }

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
