import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShiftsService } from '~/app/core/services/shift/shifts.service';
import { Shift } from '~/app/core/services/shift/shift';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyboardType } from '~/app/core/FormComponents/textField/keyboardType';
import { ValueList } from 'nativescript-drop-down';
import { Monday, Tuesday, Wednesday, Thursday, Sunday, Saturday, Friday } from '~/app/core/days';
import { RecurrenceType } from '~/app/core/services/shift/recurrenceType';

@Component({
    selector: 'ns-create-shift',
    templateUrl: './createShift.component.html',
    styleUrls: ['./createShift.component.css']
})
export class CreateShiftComponent {
    @ViewChild(NgForm, {read: NgForm, static: false}) public form: NgForm;

    public numberKeyboardType = KeyboardType.number;
    public textKeyboardType = KeyboardType.text;
    public shift = Shift.constructNew();

    private everyYear = {value: RecurrenceType.EveryYear, display: RecurrenceType.EveryYear};
    private everyMonth = {value: RecurrenceType.EveryMonth, display: RecurrenceType.EveryMonth};
    private everyWeek = {value: RecurrenceType.EveryWeek, display: RecurrenceType.EveryWeek};
    // private everyOddWeek = {value: RecurrenceType.EveryOddWeek, display: RecurrenceType.EveryOddWeek};
    // private everyEvenWeek = {value: RecurrenceType.EveryEvenWeek, display: RecurrenceType.EveryEvenWeek};
    private once = {value: RecurrenceType.OneTime, display: RecurrenceType.OneTime};

    private monday = {value: Monday, display: Monday};
    private tuesday = {value: Tuesday, display: Tuesday};
    private wednesday = {value: Wednesday, display: Wednesday};
    private thursday = {value: Thursday, display: Thursday};
    private friday = {value: Friday, display: Friday};
    private saturday = {value: Saturday, display: Saturday};
    private sunday = {value: Sunday, display: Sunday};
    private recurrenceTypes = [this.everyYear, this.everyMonth, this.everyWeek, this.once];
    private dayArray = [ this.sunday, this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday];
    public recurrenceTypesAsValueList = new ValueList<RecurrenceType>(this.recurrenceTypes);
    public daysOfWeek = new ValueList<string>(this.dayArray);

    constructor(private shiftsService: ShiftsService,
        private route: ActivatedRoute,
        private router: Router) { }

    public onSubmit() {
        this.shiftsService.push(this.shift);
        this.onBackAction();
    }

    public onBackAction() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    public get isEveryYear(): boolean {
        return this.shift.recurrenceType === RecurrenceType.EveryYear;
    }

    public get isEveryMonth(): boolean {
        return this.shift.recurrenceType === RecurrenceType.EveryMonth;
    }

    public get isEveryWeek(): boolean {
        return this.shift.recurrenceType === RecurrenceType.EveryWeek;
    }

    public get isOnce(): boolean {
        return this.shift.recurrenceType === RecurrenceType.OneTime;
    }
}
