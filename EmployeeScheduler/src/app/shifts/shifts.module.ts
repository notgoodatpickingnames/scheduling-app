import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsComponent } from './shifts.component';
import { SharedModule } from '../shared.module';
import { NonWeeklyShiftsComponent } from './shiftLists/nonWeeklyShifts/nonWeeklyShifts.component';
import { CreateShiftComponent } from './createShift/createShift.component';
import { WeeklyShiftsComponent } from './shiftLists/weeklyShifts/weeklyShifts.component';
import { EditShiftComponent } from './editShift/editShift.component';
import { ShiftsTabService } from './shiftsTab.service';
import { DateCardComponent } from './shiftLists/shiftCards/dateCard/dateCard.component';
import { WeekCardComponent } from './shiftLists/shiftCards/weekCard/weekCard.component';
import { BiWeeklyShiftsComponent } from './shiftLists/biWeeklyShifts/biWeeklyShifts.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        ShiftsComponent,
        NonWeeklyShiftsComponent,
        WeeklyShiftsComponent,
        BiWeeklyShiftsComponent,
        CreateShiftComponent,
        EditShiftComponent,
        WeekCardComponent,
        DateCardComponent
    ],
    providers: [
        ShiftsTabService
    ]
})
export class ShiftsModule { }
