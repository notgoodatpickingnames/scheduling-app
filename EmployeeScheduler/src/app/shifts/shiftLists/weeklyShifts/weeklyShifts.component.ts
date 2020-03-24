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
    public weeklyShifts: Shift[] = [];

    constructor(private shiftService: ShiftsService,
        private router: Router,
        private route: ActivatedRoute) {
            super();
            this.listenForShifts(shiftService);
    }

    public onTap(shiftId: string) {
        this.editShift(shiftId);
    }



    private editShift(shiftId: string) {
        this.router.navigate([`./edit/${shiftId}`], {relativeTo: this.route});
    }

    private listenForShifts(shiftService: ShiftsService) {
        shiftService.shift$.pipe(takeUntil(this.componentDestroyed)).subscribe(shifts => {
            this.weeklyShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryWeek);
        });
    }
}
