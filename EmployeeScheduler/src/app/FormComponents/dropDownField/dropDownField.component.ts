import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { ValueList } from "nativescript-drop-down";

@Component({
    selector: 'ns-drop-down-field',
    templateUrl: './dropDownField.component.html',
    styleUrls: ['../fieldStyles.css']
})
export class DropDownFieldComponent {
    @Input() public label: string;
    @Input() public items: ValueList<any>;
    @Input() public value: any;
    @Input() public selectedIndex: number = 0;
    @Output() public selectedIndexChange = new EventEmitter<number>();
    @Output() public valueChange = new EventEmitter<any>();

    public onChange(args: SelectedIndexChangedEventData) {        
        this.value = this.items.getValue(args.newIndex);
        this.valueChange.emit(this.value);
        this.selectedIndex = args.newIndex;
        this.selectedIndexChange.emit(this.selectedIndex);
    }

    public onOpen() {
        // console.log("Drop Down opened.");
    }

    public onclose() {
        // console.log("Drop Down closed.");
    }
}
