import { Component, OnInit } from '@angular/core';
import { ActionBarService } from '../services/actionBar.service';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(public actionBarService: ActionBarService) { }

    ngOnInit() {
        this.actionBarService.title = "Homerft";
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    public get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
