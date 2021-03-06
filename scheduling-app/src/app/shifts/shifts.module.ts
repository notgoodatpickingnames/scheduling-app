import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsComponent } from './shifts.component';
import { SharedModule } from '../shared.module';
import { NonWeeklyShiftsComponent } from './shiftLists/nonWeeklyShifts/nonWeeklyShifts.component';
import { CreateShiftComponent } from '../store/editStore/storeShifts/createShift/createShift.component';
//import { WeeklyShiftsComponent } from '../store/editStore/storeShifts/storeShifts.component';
//import { EditShiftComponent } from '../store/editStore/storeShifts/editShift/editShift.component';
//import { ShiftsTabService } from './shiftsTab.service';
import { DateCardComponent } from './shiftLists/shiftCards/dateCard/dateCard.component';
import { WeekCardComponent } from './shiftLists/shiftCards/weekCard/weekCard.component';
import { BiWeeklyShiftsComponent } from './shiftLists/biWeeklyShifts/biWeeklyShifts.component';
import { DayCardComponent } from './shiftLists/shiftCards/dayCard/dayCard.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        ShiftsComponent,
        NonWeeklyShiftsComponent,
        //WeeklyShiftsComponent,
        BiWeeklyShiftsComponent,
        //CreateShiftComponent,
        //EditShiftComponent,
        WeekCardComponent,
        DateCardComponent,
        DayCardComponent
    ],
    providers: [
        //ShiftsTabService
    ]
})
export class ShiftsModule { }
