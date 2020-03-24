import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsComponent } from './shifts.component';
import { SharedModule } from '../shared.module';
import { NonWeeklyShiftsComponent } from './nonWeeklyShifts/nonWeeklyShifts.component';
import { CreateShiftComponent } from './createShift/createShift.component';
import { WeeklyShiftsComponent } from './weeklyShifts/weeklyShifts.component';
import { EditShiftComponent } from './editShift/editShift.component';
import { ShiftsTabService } from './shiftsTab.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        ShiftsComponent,
        NonWeeklyShiftsComponent,
        WeeklyShiftsComponent,
        CreateShiftComponent,
        EditShiftComponent
    ],
    providers: [
        ShiftsTabService
    ]
})
export class ShiftsModule { }
