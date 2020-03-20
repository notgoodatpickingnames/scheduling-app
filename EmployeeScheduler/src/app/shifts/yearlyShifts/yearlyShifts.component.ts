import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { Shift } from '~/app/services/shift/shift';

@Component({
  selector: 'ns-yearly-shifts',
  templateUrl: './yearlyShifts.component.html',
  styleUrls: ['./yearlyShifts.component.css']
})
export class YearlyShiftsComponent {
    public shifts: Shift[];

    constructor(private shiftsService: ShiftsService) {
        this.shiftsService.shift$.subscribe(shifts => {
            shifts.forEach(shifts => console.log(`Year Shift Component Detected Shifts change ${shifts.dayOfTheYear}`));
            this.shifts = shifts.filter(shift => shift.dayOfTheYear !== undefined);
        });
    }

}
