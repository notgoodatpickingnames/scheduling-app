import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AccountService } from "./services/account.service";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { YourScheduleComponent } from './yourSchedule/yourSchedule.component';
import { SettingsComponent } from "./settings/settings.component";
import { ActionBarComponent } from "./actionBar/actionBar.component";
import { CalanderComponent } from './calander/calander.component';

@NgModule({
   bootstrap: [
      AppComponent
   ],
   imports: [
      NativeScriptModule,
      AppRoutingModule,
      NativeScriptFormsModule,
      NativeScriptUISideDrawerModule
   ],
   declarations: [
      AppComponent,
      YourScheduleComponent,
      SettingsComponent,
      ActionBarComponent,
      CalanderComponent
   ],
   providers: [
      AccountService
   ],
   schemas: [
      NO_ERRORS_SCHEMA
   ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
