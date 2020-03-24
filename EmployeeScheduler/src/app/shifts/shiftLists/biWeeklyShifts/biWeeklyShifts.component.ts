import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionBase } from '~/app/core/subscriptionBase';
import { Shift } from '~/app/services/shift/shift';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RecurrenceType } from '~/app/services/shift/recurrenceType';

@Component({
  selector: 'ns-bi-weekly-shifts',
  templateUrl: './biWeeklyShifts.component.html',
  styleUrls: ['./biWeeklyShifts.component.css']
})
export class BiWeeklyShiftsComponent extends SubscriptionBase {
    public evenWeeks: Shift[] = [];
    public oddWeeks: Shift[] = [];

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
            this.evenWeeks = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryEvenWeek);
            this.oddWeeks = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryOddWeek);
        });
    }
}
