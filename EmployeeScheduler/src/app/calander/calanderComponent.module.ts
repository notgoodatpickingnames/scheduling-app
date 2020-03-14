import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { CalanderComponent } from "./calander.component";
import { YearComponent } from "./year/year.component";
import { DayComponent } from "./day/day.component";
import { WeekComponent } from "./week/week.component";
import { MonthComponent } from "./month/month.component";
import { MonthDaySelectorComponent } from "./month/monthDaySelector/monthDaySelector.component";
import { SharedModule } from "../shared.module";

@NgModule({
    imports: [
       SharedModule
    ],
    declarations: [
       CalanderComponent,
       MonthComponent,
       DayComponent,
       WeekComponent,
       MonthDaySelectorComponent
    ],
    exports: [
        CalanderComponent,
        MonthComponent,
        DayComponent,
        WeekComponent
    ]
 })
 /*
 Pass your application module to the bootstrapModule function located in main.ts to start your app
 */
 export class CalanderComponentModule { }
