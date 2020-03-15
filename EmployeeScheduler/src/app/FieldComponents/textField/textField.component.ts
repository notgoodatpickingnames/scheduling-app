import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TextField} from '@nativescript/core/ui/text-field'

@Component({
    selector: 'ns-text-field',
    templateUrl: './textField.component.html',
    styleUrls: ['../fieldStyles.css']
})
export class TextFieldComponent {
    @Input() public label: string;
    @Input() public value: string;
    @Output() public valueChange = new EventEmitter<string>();

    private t = new TextField;

    public onValueChanged(newValue: any): void {
        this.t.text
        alert(`the text has changed to: ${newValue.toString()}`);
    }

}
