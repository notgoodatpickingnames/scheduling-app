import { Component, OnInit } from '@angular/core';
import { borderTopRightRadiusProperty } from 'tns-core-modules/ui/page/page';
import { DatePipe } from '@angular/common';
import { ModalDatetimepicker, PickerOptions } from 'nativescript-modal-datetimepicker';
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";

@Component({
  selector: 'ns-shift-date-picker',
  templateUrl: './shiftDatePicker.component.html',
  styleUrls: ['./shiftDatePicker.component.css']
})
export class ShiftDatePickerComponent implements OnInit {
    public seletedDate: Date;
    public startTime: Date;
    public endTime: Date;
    public employeeCount: number;

    private datePicker = new ModalDatetimepicker();
    private datePipe = new DatePipe('en');

    private p: PickerOptions;
    constructor() {}

    ngOnInit() {}

    public onShowDatePicker() {
        this.datePicker.pickDate({
            title: "Select Date of Shift",
            theme: "dark",
            startingDate: this.seletedDate ? this.seletedDate : new Date()
          }).then(result => {
            this.seletedDate = new Date(result.year, result.month - 1, result.day);
          });
    }

    public onShowStartTimePicker() {
        this.datePicker.pickTime({
            title: "Select Start Time Of Shift",
            theme: "dark",
            startingHour: this.startTime ? this.startTime.getHours() : new Date().getHours(),
            startingMinute: this.startTime ? this.startTime.getMinutes() : 0,
        }).then(result => {
            this.startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), result.hour, result.minute);
        });
    }

    public onShowEndTimePicker() {
        this.datePicker.pickTime({
            title: "Select End Time Of Shift",
            theme: "dark",
            startingHour: this.endTime ? this.endTime.getHours() : new Date().getHours(),
            startingMinute: this.endTime ? this.endTime.getMinutes() : 0,
        }).then(result => {
            this.endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), result.hour, result.minute);
        });
    }

    public get formattedSelectedDate(): string {
        return this.datePipe.transform(this.seletedDate, 'shortDate');
    }

    public get formattedStartTime(): string {
        return this.datePipe.transform(this.startTime, 'shortTime');
    }

    public get formattedEndTime(): string { // Move to the time picker.
        return this.datePipe.transform(this.endTime, 'shortTime');
    }

}
