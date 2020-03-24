import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { Shift } from '~/app/services/shift/shift';
import { RecurrenceType } from '~/app/services/shift/recurrenceType';
import { Day } from './day';
import { Days } from '~/app/core/days';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionBase } from '~/app/core/subscriptionBase';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ns-weekly-shifts',
    templateUrl: './weeklyShifts.component.html',
    styleUrls: ['./weeklyShifts.component.css']
})
export class WeeklyShiftsComponent extends SubscriptionBase {
    public days: Day[] = [];

    constructor(private shiftService: ShiftsService,
        private router: Router,
        private route: ActivatedRoute) {
            super();
            this.listenForShifts(shiftService);
    }

    public onTap(shiftId: string) {
        this.editShift(shiftId);
    }

    private buildDays(shifts: Shift[]) {
        this.days = [];
        for (let i = 0; i < 7; i++) {
            const filteredShifts = shifts.filter(shift => shift.dayOfWeek === i);
            const orderedShifts = filteredShifts.sort((shift1, shift2) => (shift1.startTime.hour > shift2.startTime.hour) ? 1 : -1);
            const newDay = new Day(Days[i], orderedShifts);
            this.days.push(newDay);
        }
    }

    private editShift(shiftId: string) {
        this.router.navigate([`./edit/${shiftId}`], {relativeTo: this.route});
    }

    private listenForShifts(shiftService: ShiftsService) {
        shiftService.shift$.pipe(takeUntil(this.componentDestroyed)).subscribe(shifts => {
            const filteredShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryWeek);
            this.buildDays(filteredShifts);
        });
    }
}
