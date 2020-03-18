import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShiftTime } from '~/app/FieldComponents/shiftTimePicker/shiftTime';
import { DatePipe } from '@angular/common';
import { KeyboardType } from '~/app/FieldComponents/textField/keyboardType';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { Shift } from '~/app/services/shift/shift';

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
    private datePipe = new DatePipe('en');

    constructor(private shiftsService: ShiftsService) {
        this.shiftsService.shift$.subscribe
    }

    public onSubmit() {
        this.shiftsService.push(this.shift);
    }

}
