import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { Router } from '@angular/router';

@Component({
    selector: 'ns-action-bar',
    templateUrl: './actionBar.component.html',
    styleUrls: ['./actionBar.component.css']
})
export class ActionBarComponent {
    @Input() title: string;
    @Input() showBackButton: boolean = true;

    @Output() back = new EventEmitter();

    constructor(private router: Router) {}

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onAccountButtonTap(): void {
        this.router.navigate(['account']);
    }

    public onBackButtonTap(): void {
        this.back.emit();
    }

    private animateSettingsButton(): void {

    }

}
