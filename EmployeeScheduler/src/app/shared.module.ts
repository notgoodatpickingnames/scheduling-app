import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ActionBarComponent } from "./actionBar/actionBar.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card"

@NgModule({
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        CommonModule,
        MatCardModule
    ],
    declarations: [
        ActionBarComponent
    ],
    exports: [
        ActionBarComponent,
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        CommonModule,
        MatCardModule
    ]
})
export class SharedModule { }
