import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { borderTopRightRadiusProperty } from 'tns-core-modules/ui/page/page';
import { DatePipe } from '@angular/common';
import { ModalDatetimepicker, PickerOptions } from 'nativescript-modal-datetimepicker';
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";

@Component({
  selector: 'ns-shift-date-picker',
  templateUrl: './shiftDatePicker.component.html',
  styleUrls: ['../fieldStyles.css']
})
export class ShiftDatePickerComponent{
    @Input() public label = '';
    @Input() public modalTitle = '';

    @Input() public date: Date;
    @Output() dateChange = new EventEmitter<Date>();

    private datePicker = new ModalDatetimepicker();
    private datePipe = new DatePipe('en');

    public onShowDatePicker() {
        this.datePicker.pickDate({
            title: this.modalTitle,
            theme: "dark",
            startingDate: this.date && this.date.toString() !== "Invalid Date" ? this.date : new Date()
          }).then(result => {
            if (result !== undefined) {
                this.date = new Date(result.year, result.month - 1, result.day);
                this.dateChange.emit(this.date);
            }
          });
    }

    public get formattedDate(): string {
        return this.date !== undefined && this.date.toString() !=="Invalid Date" ? this.datePipe.transform(this.date, 'shortDate') : undefined;
    }
}
