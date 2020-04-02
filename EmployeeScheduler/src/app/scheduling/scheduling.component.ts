import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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

@Component({
    selector: 'ns-scheduling',
    templateUrl: './scheduling.component.html',
    styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent{
    @ViewChild('previousMonthElem', {read: ElementRef, static: false}) public set previousMonthView(monthRef: ElementRef) {
        this._previousMonthView = <View>monthRef.nativeElement;
        this.initMonthViews();
    }
    @ViewChild('nextMonthElem', {read: ElementRef, static: false}) public set nextMonthView(monthRef: ElementRef) {
        this._nextMonthView = <View>monthRef.nativeElement;
        this.initMonthViews();
    }

    @ViewChild('currentMonthElem', {read: ElementRef, static: false}) public set currentMonthView(monthRef: ElementRef) {
        this._currentMonthView = <View>monthRef.nativeElement;
        this.initMonthViews();
    }

    @ViewChild('monthContainerElem', {read: ElementRef, static: false}) public set monthContainer(monthRef: ElementRef) {
        this._monthContainerView = <View>monthRef.nativeElement;
        this.initMonthViews();
    }

    private _previousMonthView: View;
    private _nextMonthView: View;
    private _currentMonthView: View;
    private _monthContainerView: View;

    private today = new Date();
    private selectedMonthNumber: number = this.today.getMonth();
    private selectedYear: number = this.today.getFullYear();

    public previousMonth = new Month(this.selectedYear, this.selectedMonthNumber - 1);
    public selectedMonth = new Month(this.selectedYear, this.selectedMonthNumber);
    public nextMonth = new Month(this.selectedYear, this.selectedMonthNumber + 1);

    constructor(private page: Page) {
        on("orientationChanged", this.onOrientationChanged);
    }

    public onOrientationChanged = (event) => {
        this.initMonthViews();
    }

    public get nameOfMonth(): string {
        return this.selectedMonth.name;
    }

    public onNextMonthTap(): void {
        this.moveToNextMonth();
    }

    public onPreviousMonthTap(): void {
        this.moveToPreviousMonth();
    }

    public onThisMonthDayTap(day: Day) {
        alert('this month day tapped');
    }

    private moveToNextMonth(): void {
        const deltaLeft = (this.monthContainerWidth) * -1;
        combineLatest(
        this._currentMonthView.animate({translate: {x: deltaLeft, y:0}, duration: 750}),
        this._nextMonthView.animate({translate: {x: 0, y:0}, duration: 750}))
        .subscribe(() => {
            // this.
        });
    }

    private moveToPreviousMonth(): void {

    }

    private initMonthViews(): void {
        if (this._currentMonthView && this._nextMonthView && this._previousMonthView && this._monthContainerView) {
            setTimeout(() => {
                this.initPreviousMonthView();
                this.initCurrentMonthView();
                this.initNextMonthView();
            }, 0);
        }
    }

    private initNextMonthView(): void {
        const deltaLeft = (this.monthContainerWidth);
        // alert(`Moving next month right byy ${deltaLeft}`);
        const deltaUp = this.monthHeight * 2;
        this._nextMonthView.translateX = (deltaLeft);
        // this._nextMonthView.translateY = (deltaUp);
    }

    private initPreviousMonthView(): void {
        const deltaLeft = (this.monthContainerWidth) * -1;
        // alert(`Moving previous month left by ${deltaLeft}`);
        this._previousMonthView.translateX = (deltaLeft);
    }

    private initCurrentMonthView(): void {
        const deltaUp = this.monthHeight * -1;
        //alert(`Moving current month up by ${deltaUp}`);
        // this._currentMonthView.translateY = (deltaUp);
    }

    private get monthHeight(): number {
        return 300;
    }

    private get monthContainerWidth(): number {
        return screen.mainScreen.widthDIPs;
    }
}
