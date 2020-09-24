import { Component, OnInit, Input } from '@angular/core';
import { ShiftsService } from '~/app/core/services/shift/shifts.service';
import { Shift } from '~/app/core/services/shift/shift';
import { RecurrenceType } from '~/app/core/services/shift/recurrenceType';
import { Day } from './day';
import { Days } from '~/app/core/days';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionBase } from '~/app/core/subscriptionBase';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ns-store-shifts',
    templateUrl: './storeShifts.component.html',
    styleUrls: ['./storeShifts.component.css']
})
export class StoreShiftsComponent extends SubscriptionBase {
    @Input() set storeId(storeId: string) {
        this._storeId = storeId;
        this.listenForShifts(this._storeId);
    }
    public weeklyShifts: Shift[] = [];
    public everyYearShifts: Shift[] = [];
    public everyMonthShifts: Shift[] = [];
    public oneTimeShifts: Shift[] = [];

    private static shiftsListener = new Subscription();
    private _storeId: string;

    constructor(private shiftService: ShiftsService,
        private router: Router,
        private route: ActivatedRoute) {
            super();
    }

    public onTap(shiftId: string) {
        this.editShift(shiftId);
    }

    public onCreateShiftTap() {
        this.router.navigate(['./shifts/create'], {relativeTo: this.route});
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

    private editShift(shiftId: string) {
        this.router.navigate([`./edit/${shiftId}`], {relativeTo: this.route});
    }

    private listenForShifts(storeId: string) {
        StoreShiftsComponent.shiftsListener.unsubscribe();
        StoreShiftsComponent.shiftsListener = this.shiftService.getShiftListener(storeId)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(shifts => {
                this.weeklyShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryWeek);
                this.everyYearShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryYear);
                this.everyMonthShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryMonth);
                this.oneTimeShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.OneTime);
            });
    }
}
