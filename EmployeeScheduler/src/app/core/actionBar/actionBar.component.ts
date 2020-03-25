import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";

@Component({
    selector: 'ns-action-bar',
    templateUrl: './actionBar.component.html',
    styleUrls: ['./actionBar.component.css']
})
export class ActionBarComponent {
    @Input() title: string;
    @Input() showBackButton: boolean = true;

    @Output() back = new EventEmitter();

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onBackButtonTap(): void {
        this.back.emit();
    }

}
