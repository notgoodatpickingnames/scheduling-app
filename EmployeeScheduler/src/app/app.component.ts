import * as firebase from 'nativescript-plugin-firebase';
import { Component, EventEmitter } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Router, ActivatedRoute } from '@angular/router';
import { ShiftsService } from './core/services/shift/shifts.service';
import { ApplicationEventData } from 'tns-core-modules/application/application';
import * as app from "tns-core-modules/application";
import { SchedulesService } from './core/services/schedule/schedules.service';
import { BehaviorSubject } from 'rxjs';

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
                    // this.authenticate.
                    this.loadServices();
                }
            });
    }

    ngOnInit(): void {
        this.sideDrawerTransition = new SlideInOnTopTransition();
        this.router.navigate(['account'], {relativeTo: this.route});
    }

    public onNavigationTap(route: string) {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
        this.onNavigateTo(route);
    }

    public onNavigateTo(route: string) {
        this.router.navigate([route], {relativeTo: this.route});
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    private loadServices() {
        this.shiftsService.initialise();
        this.schedulesService.initialise();
    }
}
