import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '~/app/core/services/shift/shifts.service';
import { Shift } from '~/app/core/services/shift/shift';
import { RecurrenceType } from '~/app/core/services/shift/recurrenceType';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionBase } from '~/app/core/subscriptionBase';

@Component({
  selector: 'ns-non-weekly-shifts',
  templateUrl: './nonWeeklyShifts.component.html',
  styleUrls: ['./nonWeeklyShifts.component.css']
})
export class NonWeeklyShiftsComponent extends SubscriptionBase {
    public everyYearShifts: Shift[] = [];
    public everyMonthShifts: Shift[] = [];
    public oneTimeShifts: Shift[] = [];

    constructor(private shiftService: ShiftsService,
        private router: Router,
        private route: ActivatedRoute) {
            super();
            this.ListenForShifts(shiftService);
    }

    public onShiftCardTap(shiftId: string) {
        this.editShift(shiftId);
    }

    public editShift(shiftId: string) {
        this.router.navigate([`./edit/${shiftId}`], {relativeTo: this.route});
    }

    public get hasEveryYearShifts(): boolean {
        return this.everyYearShifts.length > 0;
    }

    public get hasEveryMonthShifts(): boolean {
        return this.everyMonthShifts.length > 0;
    }

    public get hasOneTimeShifts(): boolean {
        return this.oneTimeShifts.length > 0;
    }

    private ListenForShifts(shiftService: ShiftsService) {
        shiftService.shift$.pipe(takeUntil(this.componentDestroyed)).subscribe(shifts => {
            this.everyYearShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryYear);
            this.everyMonthShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryMonth);
            this.oneTimeShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.OneTime);
        });
    }
}
