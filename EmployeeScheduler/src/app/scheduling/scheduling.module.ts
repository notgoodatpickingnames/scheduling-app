import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingComponent } from './scheduling.component';
import { SharedModule } from '../shared.module';
import { CalanderComponentModule } from '../calander/calanderComponent.module';
import { SchedulingDayComponent } from './schedulingDay/schedulingDay.component';

@NgModule({
    imports: [
        CommonModule,
        CalanderComponentModule,
        SharedModule
    ],
    declarations: [
        SchedulingComponent,
        SchedulingDayComponent
    ]
})
export class SchedulingModule { }
