import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import {TextField} from '@nativescript/core/ui/text-field'
import * as utils from "@nativescript/core/utils/utils";
import { KeyboardType } from './keyboardType';
// import { TextField } from "@nativescript/core/ui/text-field";

@Component({
    selector: 'ns-text-field',
    templateUrl: './textField.component.html',
    styleUrls: ['../fieldStyles.css']
})
export class TextFieldComponent {
    @Input() public label = "";
    @Input() public value = "";
    @Input() public keyboardType = KeyboardType.text;
    @Output() public valueChange = new EventEmitter<string>();

    public onTextChanged(newValue: string): void {
        this.value = newValue;
        this.valueChange.emit(this.value);
    }

}
