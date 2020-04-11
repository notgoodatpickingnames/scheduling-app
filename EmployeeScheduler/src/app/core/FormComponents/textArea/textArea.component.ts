import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardType } from '../textField/keyboardType';

@Component({
    selector: 'ns-text-area',
    templateUrl: './textArea.component.html',
    styleUrls: ['../fieldStyles.css']
})
export class TextAreaComponent {
    @Input() public label = "";
    @Input() public value = "";
    @Input() public hint = "";
    @Input() public keyboardType;
    @Output() public valueChange = new EventEmitter<string>();

    public onTextChanged(newValue: string): void {
        this.value = newValue;
        this.valueChange.emit(this.value);
    }

}
