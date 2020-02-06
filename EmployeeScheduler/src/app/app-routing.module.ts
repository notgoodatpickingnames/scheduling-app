import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { YourScheduleComponent } from "./yourSchedule/yourSchedule.component";
import { SettingsComponent } from "./settings/settings.component";


const routes: Routes = [
    { path: "", redirectTo: "/yourSchedule", pathMatch: "full" },
    { path: 'yourSchedule', component: YourScheduleComponent},
    { path: 'settings', component: SettingsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
