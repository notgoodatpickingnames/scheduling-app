import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Month } from './models/month';
import { ShiftsService } from '../core/services/shift/shifts.service';
import { SubscriptionBase } from '../core/subscriptionBase';
import { Shift } from '../core/services/shift/shift';
import { takeUntil, combineAll } from 'rxjs/operators';
import { Day } from './models/day';
import { SchedulesService } from '../core/services/schedule/schedules.service';
import { Page, View, translateXProperty } from 'tns-core-modules/ui/page/page';
import { StackLayout } from '@nativescript/core/ui';
import { screen } from "tns-core-modules/platform/platform"
import * as app from "tns-core-modules/application";
import { on } from 'tns-core-modules/application';
import { combineLatest } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'ns-scheduling',
    templateUrl: './scheduling.component.html',
    styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent {
    @ViewChild('month0Elem', {read: ElementRef, static: false}) public set month0View(monthRef: ElementRef) {
        this._month0View = <View>monthRef.nativeElement;
    }
    @ViewChild('month1Elem', {read: ElementRef, static: false}) public set month1View(monthRef: ElementRef) {
        this._month1View = <View>monthRef.nativeElement;
    }

    private datePipe = new DatePipe('en');

    private _month0View: View;
    private _month1View: View;

    private today = new Date();
    private selectedMonthNumber: number = this.today.getMonth();
    private selectedYear: number = this.today.getFullYear();

    public month0 = new Month(this.selectedYear, this.selectedMonthNumber);
    public month1: Month;

    public isMonth0Shown = true;

    constructor(private page: Page) {
        on("orientationChanged", this.onOrientationChanged);
    }

    public onOrientationChanged = (event) => {
        // Change the name shorthand here.
    }

    public onNextMonthTap(): void {
        this.moveToNextMonth();
    }

    public onPreviousMonthTap(): void {
        this.moveToPreviousMonth();
    }

    public onThisMonthDayTap(day: Day) {
    }

    public get monthYearHeader(): string {
        const date = new Date(this.selectedYear, this.selectedMonthNumber, 1);
        return `${this.datePipe.transform(date, 'MMMM')} ${this.selectedYear}`;
    }

    private moveToNextMonth(): void {
        if (this.selectedMonthNumber + 1 === 12) {
            this.selectedYear++;
            this.selectedMonthNumber = -1;
        }

        this.selectedMonthNumber++;
        const deltaLeft = (this.monthContainerWidth) * -1;

        if (this.isMonth0Shown) {
            this.month1 = new Month(this.selectedYear, this.selectedMonthNumber);
            this._month1View.translateX = this.monthContainerWidth;
            combineLatest(
                this._month0View.animate({translate: {x: deltaLeft, y:0}, duration: 750}),
                this._month1View.animate({translate: {x: 0, y:0}, duration: 750}))
            .subscribe(() => {
                this.isMonth0Shown = false;
            });
        } else {
            this.month0 = new Month(this.selectedYear, this.selectedMonthNumber);
            this._month0View.translateX = this.monthContainerWidth;
            combineLatest(
                this._month1View.animate({translate: {x: deltaLeft, y:0}, duration: 750}),
                this._month0View.animate({translate: {x: 0, y:0}, duration: 750}))
            .subscribe(() => {
                this.isMonth0Shown = true;
            });
        }
    }

    private moveToPreviousMonth(): void {
        if (this.selectedMonthNumber - 1 === 0) {
            this.selectedYear--;
            this.selectedMonthNumber = 12;
        }

        this.selectedMonthNumber--;
        const deltaRight = (this.monthContainerWidth);

        if (this.isMonth0Shown) {
            this.month1 = new Month(this.selectedYear, this.selectedMonthNumber);
            this._month1View.translateX = this.monthContainerWidth * -1;
            combineLatest(
                this._month0View.animate({translate: {x: deltaRight, y:0}, duration: 750}),
                this._month1View.animate({translate: {x: 0, y:0}, duration: 750}))
            .subscribe(() => {
                this.isMonth0Shown = false;
            });
        } else {
            this.month0 = new Month(this.selectedYear, this.selectedMonthNumber);
            this._month0View.translateX = this.monthContainerWidth * -1;
            combineLatest(
                this._month1View.animate({translate: {x: deltaRight, y:0}, duration: 750}),
                this._month0View.animate({translate: {x: 0, y:0}, duration: 750}))
            .subscribe(() => {
                this.isMonth0Shown = true;
            });
        }
    }

    private get monthContainerWidth(): number {
        return screen.mainScreen.widthDIPs;
    }
}
