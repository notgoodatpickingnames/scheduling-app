import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ns-shiftTimePicker',
  templateUrl: './shiftTimePicker.component.html',
  styleUrls: ['./shiftTimePicker.component.css']
})
export class ShiftTimePickerComponent {
    @Input() public label = '';
    @Input() public modalTitle = '';

    @Input() public hours: number;
    @Input() public minutes: number;
    @Output() hoursChange = new EventEmitter<Number>();
    @Output() minutesChange = new EventEmitter<Number>();

    private timePicker = new ModalDatetimepicker();
    private datePipe = new DatePipe('en');

    public onShowTimePicker() {
        this.timePicker.pickTime({
            title: this.modalTitle,
            theme: "dark",
            startingHour: this.hours ? this.hours : new Date().getHours(),
            startingMinute: this.minutes ? this.minutes : 0,
        }).then(result => {
            this.hours = result.hour;
            this.minutes = result.minute;
            this.hoursChange.emit(this.hours);
            this.minutesChange.emit(this.minutes);
        });
    }

    private get formattedTime(): string {
        const timeAsDate = new Date(0, 0, 0, this.hours, this.minutes);
        return this.datePipe.transform(timeAsDate, 'shortTime');
    }
}
