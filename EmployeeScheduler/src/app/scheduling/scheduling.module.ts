import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingComponent } from './scheduling.component';
import { SharedModule } from '../shared.module';
import { CalanderComponentModule } from '../calander/calanderComponent.module';

@NgModule({
    imports: [
        CommonModule,
        CalanderComponentModule,
        SharedModule
    ],
    declarations: [
        SchedulingComponent
    ]
})
export class SchedulingModule { }
