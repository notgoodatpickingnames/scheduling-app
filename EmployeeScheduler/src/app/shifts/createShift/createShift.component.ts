import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { Shift } from '~/app/services/shift/shift';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyboardType } from '~/app/FormComponents/textField/keyboardType';
import { ValueList } from 'nativescript-drop-down';
import { ShiftType } from '~/app/services/shift/shiftType';
import { Monday, Tuesday, Wednesday, Thursday, Sunday, Saturday, Friday } from '~/app/core/days';

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

    private everyYear = {value: ShiftType.EveryYear, display: ShiftType.EveryYear};
    private everyMonth = {value: ShiftType.EveryMonth, display: ShiftType.EveryMonth};
    private everyWeek = {value: ShiftType.EveryWeek, display: ShiftType.EveryWeek};
    private everyOtherWeek = {value: ShiftType.EveryOtherWeek, display: ShiftType.EveryOtherWeek};
    private once = {value: ShiftType.OneTime, display: ShiftType.OneTime};

    private monday = {value: Monday, display: Monday};
    private tuesday = {value: Tuesday, display: Tuesday};
    private wednesday = {value: Wednesday, display: Wednesday};
    private thursday = {value: Thursday, display: Thursday};
    private friday = {value: Friday, display: Friday};
    private saturday = {value: Saturday, display: Saturday};
    private sunday = {value: Sunday, display: Sunday};
    public typesAsValueList = new ValueList<ShiftType>([this.everyYear, this.everyMonth, this.everyWeek, this.everyOtherWeek, this.once]);
    public daysOfWeek = new ValueList<string>([this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday]);

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
        return this.shift.type === ShiftType.EveryYear;
    }

    public get isEveryMonth(): boolean {
        return this.shift.type === ShiftType.EveryMonth;
    }

    public get isEveryWeek(): boolean {
        return this.shift.type === ShiftType.EveryWeek;
    }

    public get isEveryOtherWeek(): boolean {
        return this.shift.type === ShiftType.EveryOtherWeek;
    }

    public get isOnce(): boolean {
        return this.shift.type === ShiftType.OneTime;
    }
}
