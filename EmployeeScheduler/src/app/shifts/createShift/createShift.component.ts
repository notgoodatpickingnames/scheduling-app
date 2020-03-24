import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { Shift } from '~/app/services/shift/shift';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyboardType } from '~/app/FormComponents/textField/keyboardType';
import { ValueList } from 'nativescript-drop-down';
import { Monday, Tuesday, Wednesday, Thursday, Sunday, Saturday, Friday } from '~/app/core/days';
import { RecurrenceType } from '~/app/services/shift/recurrenceType';

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
    private everyOtherWeek = {value: RecurrenceType.EveryOtherWeek, display: RecurrenceType.EveryOtherWeek};
    private once = {value: RecurrenceType.OneTime, display: RecurrenceType.OneTime};

    private monday = {value: Monday, display: Monday};
    private tuesday = {value: Tuesday, display: Tuesday};
    private wednesday = {value: Wednesday, display: Wednesday};
    private thursday = {value: Thursday, display: Thursday};
    private friday = {value: Friday, display: Friday};
    private saturday = {value: Saturday, display: Saturday};
    private sunday = {value: Sunday, display: Sunday};
    private recurrenceTypes = [this.everyYear, this.everyMonth, this.everyWeek, this.everyOtherWeek, this.once];
    private dayArray = [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday];
    public recurrenceTypesAsValueList = new ValueList<RecurrenceType>(this.recurrenceTypes);
    public daysOfWeek = new ValueList<string>(this.dayArray);

    constructor(private shiftsService: ShiftsService,
        private route: ActivatedRoute,
        private router: Router) { }

    public onSubmit() {
        // this.form.submit
        // if (this.form.isValid) {
            //alert("The shift is valid so we gon send it boi")
            this.shiftsService.push(this.shift);
            this.onBackAction();
        // } else {
            // alert("The shift is invalid so fuck you");2
        //}
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

    public get isEveryOtherWeek(): boolean {
        return this.shift.recurrenceType === RecurrenceType.EveryOtherWeek;
    }

    public get isOnce(): boolean {
        return this.shift.recurrenceType === RecurrenceType.OneTime;
    }
}
