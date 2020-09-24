// import { Component, OnInit } from '@angular/core';
// import { Day } from './day';
// import { Days } from './node_modules/~/app/core/days';
// import { Router, ActivatedRoute } from '@angular/router';
// import { SubscriptionBase } from './node_modules/~/app/core/subscriptionBase';
// import { takeUntil } from 'rxjs/operators';

// @Component({
//     selector: 'ns-weekly-shifts',
//     templateUrl: './weeklyShifts.component.html',
//     styleUrls: ['./weeklyShifts.component.css']
// })
// export class WeeklyShiftsComponent extends SubscriptionBase {
//     public weeklyShifts: Shift[] = [];
//     public everyYearShifts: Shift[] = [];
//     public everyMonthShifts: Shift[] = [];
//     public oneTimeShifts: Shift[] = [];

//     constructor(private shiftService: ShiftsService,
//         private router: Router,
//         private route: ActivatedRoute) {
//             super();
//             this.listenForShifts(shiftService);
//     }

//     public onTap(shiftId: string) {
//         this.editShift(shiftId);
//     }

//     public get hasEveryYearShifts(): boolean {
//         return this.everyYearShifts.length > 0;
//     }

//     public get hasEveryMonthShifts(): boolean {
//         return this.everyMonthShifts.length > 0;
//     }

//     public get hasOneTimeShifts(): boolean {
//         return this.oneTimeShifts.length > 0;
//     }

//     private editShift(shiftId: string) {
//         this.router.navigate([`./edit/${shiftId}`], {relativeTo: this.route});
//     }

//     private listenForShifts(shiftService: ShiftsService) {
//         shiftService.shift$.pipe(takeUntil(this.componentDestroyed)).subscribe(shifts => {
//             this.weeklyShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryWeek);
//             this.everyYearShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryYear);
//             this.everyMonthShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.EveryMonth);
//             this.oneTimeShifts = shifts.filter(shift => shift.recurrenceType === RecurrenceType.OneTime);
//         });
//     }
// }
