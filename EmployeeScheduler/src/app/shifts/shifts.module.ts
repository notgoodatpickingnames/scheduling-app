import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsComponent } from './shifts.component';
import { SharedModule } from '../shared.module';
import { YearlyShiftsComponent } from './yearlyShifts/yearlyShifts.component';
import { CreateShiftComponent } from './createShift/createShift.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        ShiftsComponent,
        YearlyShiftsComponent,
        CreateShiftComponent
    ],
    providers: [
        // tabService to hold our last tab when navigating the shifts area.
    ]
})
export class ShiftsModule { }
