import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { Shift } from '~/app/services/shift/shift';

@Component({
  selector: 'ns-special-shifts',
  templateUrl: './specialShifts.component.html',
  styleUrls: ['./specialShifts.component.css']
})
export class SpecialShiftsComponent {
    public shifts: Shift[];

    constructor(private shiftService: ShiftsService) {
        shiftService.shift$.subscribe(shifts => {
            this.shifts = shifts.filter(shift => shift.dayOfWeek !== undefined);
        });
    }

}
