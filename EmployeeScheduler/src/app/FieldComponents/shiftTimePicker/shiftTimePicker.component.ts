import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';
import { DatePipe } from '@angular/common';
import { ShiftTime } from './shiftTime';

@Component({
  selector: 'ns-shift-time-picker',
  templateUrl: './shiftTimePicker.component.html',
  styleUrls: ['../fieldStyles.css']
})
export class ShiftTimePickerComponent {
    @Input() public label = '';
    @Input() public modalTitle = '';

    @Input() public shiftTime: ShiftTime;
    @Output() shiftTimeChange = new EventEmitter<ShiftTime>();

    private timePicker = new ModalDatetimepicker();
    private datePipe = new DatePipe('en');

    public onShowTimePicker() {
        this.timePicker.pickTime({
            title: this.modalTitle,
            theme: "dark",
            startingHour: this.shiftTime ? this.shiftTime.hour : new Date().getHours(),
            startingMinute: this.shiftTime ? this.shiftTime.minute : 0,
        }).then(timeResponse => {
            this.shiftTime = timeResponse;
            this.shiftTimeChange.emit(this.shiftTime);
        });
    }

    private get formattedTime(): string {
        if (this.shiftTime) {
            const timeAsDate = new Date(0, 0, 0, this.shiftTime.hour, this.shiftTime.minute);
            return this.datePipe.transform(timeAsDate, 'shortTime');
        }

        return undefined;
    }
}
