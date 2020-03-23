import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { YourScheduleComponent } from "./yourSchedule/yourSchedule.component";
import { SettingsComponent } from "./settings/settings.component";
import { YearSummaryComponent } from "./scheduleCreation/yearSummary/yearSummary.component";
import { ShiftsComponent } from "./shifts/shifts.component";
import { CreateShiftComponent } from "./shifts/createShift/createShift.component";
import { EditShiftComponent } from "./shifts/editShift/editShift.component";


const routes: Routes = [
    { path: "", redirectTo: "/yourSchedule", pathMatch: "full" },
    { path: 'yourSchedule', component: YourScheduleComponent},
    { path: 'settings', component: SettingsComponent },
    { path: 'yearSummary', component: YearSummaryComponent},
    { path: 'shifts', component: ShiftsComponent},
    { path: 'shifts/create', component: CreateShiftComponent},
    { path: 'shifts/edit/:id', component: EditShiftComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
