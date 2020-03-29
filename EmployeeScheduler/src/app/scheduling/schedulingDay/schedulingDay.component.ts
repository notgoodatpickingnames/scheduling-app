import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Day } from '../models/day';
import { Label } from '@nativescript/core/ui';
import { StackLayout } from '@nativescript/core/ui';
import { Page } from '@nativescript/core/ui';
import { Color } from 'tns-core-modules/color/color';
import { View, Observable } from 'tns-core-modules/ui/core/view/view';
import { DayStates } from '../dayStates';
import { Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SubscriptionBase } from '~/app/core/subscriptionBase';
import { successColor, mainBgColor, errorColor, warningColor } from '~/app/core/colors';

@Component({
    selector: 'ns-scheduling-day',
    templateUrl: './schedulingDay.component.html',
    styleUrls: ['./schedulingDay.component.css']
})
export class SchedulingDayComponent extends SubscriptionBase {
    @ViewChild('label', {read: ElementRef, static: false}) public set labelRef(labelRef: ElementRef) {
        this.labelView = <View>labelRef.nativeElement;
    }
    @ViewChild('labelContainer', {read: ElementRef, static: false}) public set containerRef(containerRef: ElementRef) {
        this.containerView = <View>containerRef.nativeElement;
    }

    @Input() public set day(day: Day) {
        this._day = day;
        this.listenForState(day);
    }
    @Input() public monthNumber: number;
    @Output() public onDayTap = new EventEmitter<Day>();

    public get day(): Day {
        return this._day;
    }

    private _day: Day;
    private stateListener = new Subscription;
    private dayState = DayStates.normal;
    private labelView: View;
    private containerView: View;

    public onTap(): void {
        this.onDayTap.emit(this.day);
    }

    public get isDayInMonth(): boolean {
        if (this.day && this.monthNumber) {
            return this.day.date.getMonth() === this.monthNumber;
        }

        return false;
    }

    private listenForState(day: Day) {
        this.stateListener.unsubscribe();
        this.stateListener = day.stateChange.pipe(takeUntil(this.componentDestroyed)).subscribe(state => this.onStateChange(state));
    }

    private onStateChange(state: DayStates): void {
        this.dayState = state;
        switch(this.dayState) {
            case DayStates.normal: this.animateToNormal();
                break;
            case DayStates.conflict: this.animateToConflict();
                break;
            case DayStates.warning: this.animateToWarning();
                break;
            case DayStates.allConditionsMet: this.animateToAllConditionsMet();
                break;
            default: break;
        }
    }

    private animateToNormal() {
        this.animateBackgroundColor(this.containerView, mainBgColor);
    }

    private animateToConflict() {
        this.animateBackgroundColor(this.containerView, errorColor);
    }

    private animateToWarning() {
        alert('the state has been changed to warning');
        this.animateBackgroundColor(this.containerView, warningColor);
    }

    private animateToAllConditionsMet() {
        this.animateBackgroundColor(this.containerView, successColor);
    }

    private animateBackgroundColor(view: View, color: Color) {
        view.animate({
            backgroundColor: color,
            duration: 1000
        });
    }
}
