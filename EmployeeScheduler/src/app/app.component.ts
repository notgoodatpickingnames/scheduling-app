import * as firebase from 'nativescript-plugin-firebase';
import { Component } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Router, ActivatedRoute } from '@angular/router';
import { ShiftsService } from './core/services/shift/shifts.service';
import { ApplicationEventData } from 'tns-core-modules/application/application';
import * as app from "tns-core-modules/application";
import { SchedulesService } from './core/services/schedule/schedules.service';

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
        private shiftsService: ShiftsService,
        private schedulesService: SchedulesService
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
        this.router.navigate(['scheduling'], {relativeTo: this.route});
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
        this.schedulesService.initialise();
    }
}
