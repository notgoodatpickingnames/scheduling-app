import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ActionBarComponent } from "./core/actionBar/actionBar.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card"
import { ShiftDatePickerComponent } from "./core/FormComponents/shiftDatePicker/shiftDatePicker.component";
import { ShiftTimePickerComponent } from "./core/FormComponents/shiftTimePicker/shiftTimePicker.component";
import { TextFieldComponent } from "./core/FormComponents/textField/textField.component";
import { TextAreaComponent } from "./core/FormComponents/textArea/textArea.component";
import { DropDownFieldComponent } from "./core/FormComponents/dropDownField/dropDownField.component";

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
        TextAreaComponent,
        DropDownFieldComponent
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
        TextAreaComponent,
        DropDownFieldComponent
    ]
})
export class SharedModule { }
