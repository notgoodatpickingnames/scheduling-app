import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Shift } from '~/app/core/services/shift/shift';
import { Day } from '../../weeklyShifts/day';
import { Days } from '~/app/core/days';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-week-card',
  templateUrl: './weekCard.component.html',
  styleUrls: ['../cardStyles.css']
})
export class WeekCardComponent {
    @Input() public set shifts(shifts: Shift[]) {
        this._shifts = shifts;
        this.days = this.buildDays(shifts);
    }
    @Output() public onShiftTap = new EventEmitter<string>();

    public get shifts(): Shift[] {
        return this._shifts;
    }

    public days: Day[];
    private _shifts: Shift[];

    public onShiftTapped(shiftId: string) {
        this.onShiftTap.emit(shiftId);
    }

    private buildDays(shifts: Shift[]): Day[] {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const filteredShifts = shifts.filter(shift => shift.dayOfWeek === i);
            const orderedShifts = filteredShifts.sort((shift1, shift2) => (shift1.startTime.hour > shift2.startTime.hour) ? 1 : -1);
            const newDay = new Day(Days[i], orderedShifts);
            days.push(newDay);
        }

        return days;
    }
}
