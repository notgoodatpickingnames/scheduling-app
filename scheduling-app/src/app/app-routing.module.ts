import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { ShiftsComponent } from "./shifts/shifts.component";
import { CreateShiftComponent } from "./store/editStore/storeShifts/createShift/createShift.component";
import { EditShiftComponent } from "./store/editStore/storeShifts/editShift/editShift.component";
import { SchedulingComponent } from "./scheduling/scheduling.component";
import { AccountComponent } from "./account/account.component";
import { PersonalScheduleComponent } from "./personalSchedule/personalSchedule.component";
import { StoreComponent } from "./store/store.component";
import { CreateStoreComponent } from "./store/createStore/createStore.component";
import { EditStoreComponent } from "./store/editStore/editStore.component";


const routes: Routes = [
    { path: "", redirectTo: "/personalSchedule", pathMatch: "full" },
    { path: 'personalSchedule', component: PersonalScheduleComponent },
    { path: 'account', component: AccountComponent },
    { path: 'scheduling', component: SchedulingComponent },
    { path: 'stores', component: StoreComponent },
    { path: 'stores/create', component: CreateStoreComponent },
    { path: 'stores/edit/:storeId', component: EditStoreComponent },
    { path: 'stores/edit/:storeId/shifts/create', component: CreateShiftComponent },
    { path: 'stores/edit/:storeId/shifts/create/:shiftId', component: EditShiftComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
