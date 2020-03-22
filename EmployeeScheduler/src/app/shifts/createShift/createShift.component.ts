import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { Shift } from '~/app/services/shift/shift';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyboardType } from '~/app/FormComponents/textField/keyboardType';
import { ValueList } from 'nativescript-drop-down';
import { ShiftType } from '~/app/services/shift/shiftType';

@Component({
    selector: 'ns-createShift',
    templateUrl: './createShift.component.html',
    styleUrls: ['./createShift.component.css']
})
export class CreateShiftComponent {
    @ViewChild(NgForm, {read: NgForm, static: false}) public form: NgForm;

    public numberKeyboardType = KeyboardType.number;
    public textKeyboardType = KeyboardType.text;

    public shift = Shift.constructNew();
    public shifts: Shift[] = [];

    
    private everyYear = {value: ShiftType.EveryYear, display: ShiftType.EveryYear};
    private everyMonth = {value: ShiftType.EveryMonth, display: ShiftType.EveryMonth};
    private EveryOtherWeek = {value: ShiftType.EveryOtherWeek, display: ShiftType.EveryOtherWeek};
    private once = {value: ShiftType.OneTime, display: ShiftType.OneTime};
    public typesAsValueList = new ValueList<ShiftType>([this.everyYear, this.everyMonth, this.EveryOtherWeek, this.once]);

    constructor(private shiftsService: ShiftsService,
        private route: ActivatedRoute,
        private router: Router) {
        this.shiftsService.shift$.subscribe(shifts => {
            this.shifts = shifts;
        });
    }

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
}
