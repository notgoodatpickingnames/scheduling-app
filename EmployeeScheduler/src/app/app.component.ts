import * as firebase from 'nativescript-plugin-firebase';
import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    public sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.initialiseFirebaseAndAuthenticate();
    }

    private initialiseFirebaseAndAuthenticate() {
        firebase.init()
            .then(() => console.log('Firebase initialised.'))
            .catch(error => console.log(error));
    }

    ngOnInit(): void {
        //this.sideDrawerTransition = new SlideInOnTopTransition();
        // this.router.navigate(['yourSchedule'], {relativeTo: this.route});
    }

    public navigateTo(route: string) {
        this.router.navigate([route], {relativeTo: this.route});
    }




}
