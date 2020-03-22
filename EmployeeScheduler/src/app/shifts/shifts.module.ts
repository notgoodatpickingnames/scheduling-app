import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsComponent } from './shifts.component';
import { SharedModule } from '../shared.module';
import { SpecialShiftsComponent } from './specialShifts/specialShifts.component';
import { CreateShiftComponent } from './createShift/createShift.component';
import { WeeklyShiftsComponent } from './weeklyShifts/weeklyShifts.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        ShiftsComponent,
        SpecialShiftsComponent,
        WeeklyShiftsComponent,
        CreateShiftComponent
    ],
    providers: [
        // tabService to hold our last tab when navigating the shifts area.
    ]
})
export class ShiftsModule { }
