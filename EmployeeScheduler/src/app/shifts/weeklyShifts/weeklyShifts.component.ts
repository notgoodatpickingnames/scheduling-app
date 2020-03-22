import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { Shift } from '~/app/services/shift/shift';

@Component({
    selector: 'ns-weekly-shifts',
    templateUrl: './weeklyShifts.component.html',
    styleUrls: ['./weeklyShifts.component.css']
})
export class WeeklyShiftsComponent {
    public shifts: Shift[];

    constructor(private shiftService: ShiftsService) { 
        shiftService.shift$.subscribe(shifts => {
            shifts.forEach(shifts => console.log(`Year Shift Component Detected Shifts change ${shifts.dayOfTheYear}`));
            this.shifts = shifts.filter(shift => shift.dayOfTheYear !== undefined);
        });
    }


}
