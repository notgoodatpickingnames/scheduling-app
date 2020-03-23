import * as firebase from 'nativescript-plugin-firebase';
import { Component } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Router, ActivatedRoute } from '@angular/router';
import { ShiftsService } from './services/shift/shifts.service';
import { ApplicationEventData } from 'tns-core-modules/application/application';
import * as app from "tns-core-modules/application";

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
                this.loadServices();
            }).catch(error => {
                if (error === 'Firebase already initialized') {
                    this.loadServices();
                }
            });
    }

    ngOnInit(): void {
        this.sideDrawerTransition = new SlideInOnTopTransition();
        this.router.navigate(['shifts'], {relativeTo: this.route});
    }

    public onNavigationTap(route: string) {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
        this.navigateTo(route);
    }

    private navigateTo(route: string) {
        this.router.navigate([route], {relativeTo: this.route});
    }

    private loadServices() {
        this.shiftsService.initialise();
    }
}
