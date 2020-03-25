import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AccountService } from "./core/services/account.service";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { YourScheduleComponent } from './yourSchedule/yourSchedule.component';
import { SettingsComponent } from "./settings/settings.component";
import { SharedModule } from "./shared.module";
import { ShiftsModule } from "./shifts/shifts.module";
import { ShiftsService } from "./core/services/shift/shifts.service";
import { DropDownModule } from "nativescript-drop-down/angular";
import { SchedulingModule } from "./scheduling/scheduling.module";
//import * as utils from "tns-core-modules/utils/utils";

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
      SharedModule
   ],
   declarations: [
      AppComponent,
      YourScheduleComponent,
      SettingsComponent
   ],
   providers: [
      AccountService,
      ShiftsService
   ],
   schemas: [
      NO_ERRORS_SCHEMA
   ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
