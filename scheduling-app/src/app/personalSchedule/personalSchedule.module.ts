import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalScheduleComponent } from './personalSchedule.component';
import { SharedModule } from '../shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        PersonalScheduleComponent
    ]
})
export class PersonalScheduleModule { }
