import { NgModule } from "@angular/core";
import { CalanderComponent } from "./calander.component";
import { DayComponent } from "./day/day.component";
import { MonthComponent } from "./month/month.component";
import { MonthDaySelectorComponent } from "./month/monthDaySelector/monthDaySelector.component";
import { SharedModule } from "~/app/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        CalanderComponent,
        MonthComponent,
        DayComponent,
        MonthDaySelectorComponent
    ],
    exports: [
        CalanderComponent,
        MonthComponent,
        DayComponent
    ]
 })
 /*
 Pass your application module to the bootstrapModule function located in main.ts to start your app
 */
 export class CalanderComponentModule { }
