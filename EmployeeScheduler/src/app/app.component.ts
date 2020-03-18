import * as firebase from 'nativescript-plugin-firebase';
import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Router, ActivatedRoute } from '@angular/router';
import { ShiftsService } from './services/shift/shifts.service';

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    public sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private shiftsService: ShiftsService
    ) {
        this.initialiseFirebaseAndAuthenticate();
    }

    private initialiseFirebaseAndAuthenticate() {
        firebase.init()
            .then(() => {
                console.log('Firebase initialised.');
                this.loadServices();
            }).catch(error => console.log(error));
    }

    ngOnInit(): void {
        this.sideDrawerTransition = new SlideInOnTopTransition();
        this.router.navigate(['shifts/create'], {relativeTo: this.route});
    }

    public navigateTo(route: string) {
        this.router.navigate([route], {relativeTo: this.route});
    }

    private loadServices() {
        this.shiftsService.load();
    }
}
