import { Component, OnInit, Input } from '@angular/core';
import { Shift } from '~/app/services/shift/shift';
import { Day } from '../../weeklyShifts/day';
import { Days } from '~/app/core/days';

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

    public get shifts(): Shift[] {
        return this._shifts;
    }

    public days: Day[];
    private _shifts: Shift[];

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
