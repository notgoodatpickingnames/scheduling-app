import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { YearSummaryComponent } from "./yearSummary/yearSummary.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared.module";

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        YearSummaryComponent
    ],
    exports: [
        YearSummaryComponent
    ]
 })
 /*
 Pass your application module to the bootstrapModule function located in main.ts to start your app
 */
 export class ScheduleCreationModule { }
