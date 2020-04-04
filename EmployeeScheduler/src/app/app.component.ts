import * as firebase from 'nativescript-plugin-firebase';
import { Component, EventEmitter } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Router, ActivatedRoute } from '@angular/router';
import { ShiftsService } from './core/services/shift/shifts.service';
import { ApplicationEventData, on, resumeEvent } from 'tns-core-modules/application/application';
import * as app from "tns-core-modules/application";
import { SchedulesService } from './core/services/schedule/schedules.service';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { Page } from 'tns-core-modules/ui/page/page';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionBase } from './core/subscriptionBase';
import { LoginState } from './core/services/authentication/loginState';

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent extends SubscriptionBase{
    public sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private shiftsService: ShiftsService,
        private schedulesService: SchedulesService,
        private authenticationService: AuthenticationService
    ) {
        super();
        this.initialise();
    }
    
    ngOnInit(): void {
        this.sideDrawerTransition = new SlideInOnTopTransition();
        this.router.navigate(['account'], {relativeTo: this.route});
    }
    
    private onApplicationResume() {
        alert('The app has been resumed');
    }

    private initialise(): Promise<any> {
        this.listenForLoginState();
        return firebase.init({
            onAuthStateChanged: (data) => {
                if (data.loggedIn) {
                    this.authenticationService.setUser(data.user);
                }
            }
        })
        .then(() => this.onFirebaseInit())
        .catch(error => this.onFirebaseInitError(error));
    }

    private listenForLoginState(): void {
        this.authenticationService.loginState
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(loginState => {
                alert(`Login State Changed To ${loginState}`);
                if (loginState === LoginState.loggedOut || LoginState.noCredentials) {
                    this.navigateTo('account')
                }
            });
    }

    private onFirebaseInit(): void {
        this.loadServices();
    }

    private onFirebaseInitError(error: string) {
        if (error === 'Firebase already initialized') {
            this.loadServices();
        }
    }

    public onNavigateToTap(route: string) {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        this.navigateTo(route);
        sideDrawer.closeDrawer();
    }

    public navigateTo(route: string) {
        this.router.navigate([route], {relativeTo: this.route});
    }

    private loadServices() {
        this.authenticationService.initialise();
        this.shiftsService.initialise();
        this.schedulesService.initialise();
    }
}
