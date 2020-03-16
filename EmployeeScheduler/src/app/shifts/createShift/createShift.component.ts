import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShiftTime } from '~/app/FieldComponents/shiftTimePicker/shiftTime';
import { DatePipe } from '@angular/common';
import { KeyboardType } from '~/app/FieldComponents/textField/keyboardType';

@Component({
    selector: 'ns-createShift',
    templateUrl: './createShift.component.html',
    styleUrls: ['./createShift.component.css']
})
export class CreateShiftComponent {
    @ViewChild(NgForm, {read: NgForm, static: false}) public form: NgForm;

    public date: Date;
    public startShiftTime: ShiftTime;
    public endShiftTime: ShiftTime;
    public employeeCount: number;
    public notes: string;
    public numberKeyboardType = KeyboardType.number;
    public textKeyboardType = KeyboardType.text;

    private datePipe = new DatePipe('en');

    public onSubmit() {
        // alert(`date of shift ${this.datePipe.transform(this.date, 'shortDate')}`);
        // alert(`shift starts at ${this.datePipe.transform(new Date(0,0,0, this.startShiftTime.hour, this.startShiftTime.minute), 'shortTime')}`);
        // alert(`shift ends at ${this.datePipe.transform(new Date(0,0,0, this.endShiftTime.hour, this.endShiftTime.minute), 'shortTime')}`);
        // alert(`shift ends at ${this.employeeCount}`);
        alert(`shift notes: ${this.notes}`);
    }

}
