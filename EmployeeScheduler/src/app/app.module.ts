import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AccountService } from "./core/services/account/account.service";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { SharedModule } from "./shared.module";
import { ShiftsModule } from "./shifts/shifts.module";
import { ShiftsService } from "./core/services/shift/shifts.service";
import { DropDownModule } from "nativescript-drop-down/angular";
import { SchedulingModule } from "./scheduling/scheduling.module";
import { SchedulesService } from "./core/services/schedule/schedules.service";
import { AuthenticationService } from "./core/services/authentication/authentication.service";
import { AccountModule } from "./account/account.module";
import { PersonalScheduleModule } from "./personalSchedule/personalSchedule.module";

@NgModule({
   bootstrap: [
      AppComponent
   ],
   imports: [
      AppRoutingModule,
      NativeScriptUISideDrawerModule,
      ShiftsModule,
      DropDownModule,
      SchedulingModule,
      AccountModule,
      SharedModule,
      PersonalScheduleModule
   ],
   declarations: [
      AppComponent,
      YourScheduleComponent,
   ],
   providers: [
      AccountService,
      ShiftsService,
      SchedulesService,
      AuthenticationService
   ],
   schemas: [
      NO_ERRORS_SCHEMA
   ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
