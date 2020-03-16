import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ActionBarComponent } from "./actionBar/actionBar.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card"
import { ShiftDatePickerComponent } from "./FieldComponents/shiftDatePicker/shiftDatePicker.component";
import { ShiftTimePickerComponent } from "./FieldComponents/shiftTimePicker/shiftTimePicker.component";
import { TextFieldComponent } from "./FieldComponents/textField/textField.component";
import { TextAreaComponent } from "./FieldComponents/textArea/textArea.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        CommonModule,
        MatCardModule
    ],
    declarations: [
        ActionBarComponent,
        ShiftDatePickerComponent,
        ShiftTimePickerComponent,
        TextFieldComponent,
        TextAreaComponent
    ],
    exports: [
        ActionBarComponent,
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        CommonModule,
        MatCardModule,
        ShiftDatePickerComponent,
        ShiftTimePickerComponent,
        TextFieldComponent,
        TextAreaComponent
    ]
})
export class SharedModule { }
