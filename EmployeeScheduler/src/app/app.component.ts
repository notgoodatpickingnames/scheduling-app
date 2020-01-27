import * as firebase from 'nativescript-plugin-firebase';
import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor() {
        this.initialiseFirebaseAndAuthenticate();
    }

    private initialiseFirebaseAndAuthenticate() {
        firebase.init()
            .then(() => console.log('we in bois'))
            .catch(error => console.log(error));
    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
}
