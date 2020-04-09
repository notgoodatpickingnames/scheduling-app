import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingComponent } from './scheduling.component';
import { SharedModule } from '../shared.module';
import { SchedulingDayComponent } from './schedulingDay/schedulingDay.component';
import { SchedulingMonthComponent } from './schedulingMonth/schedulingMonth.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        SchedulingComponent,
        SchedulingDayComponent,
        SchedulingMonthComponent
    ]
})
export class SchedulingModule { }
