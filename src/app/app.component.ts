import * as firebase from 'nativescript-plugin-firebase';
import { Component, EventEmitter } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Router, ActivatedRoute } from '@angular/router';
import { ShiftsService } from './core/services/shift/shifts.service';
import { ApplicationEventData, on, resumeEvent } from 'tns-core-modules/application/application';
import * as app from "tns-core-modules/application";
import { SchedulesService } from './core/services/schedule/schedules.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { Page, Observable } from 'tns-core-modules/ui/page/page';
import { takeUntil, skip, take } from 'rxjs/operators';
import { SubscriptionBase } from './core/subscriptionBase';
import { LoginState } from './core/services/authentication/loginState';
import { AuthLevel } from './core/services/authentication/authLevel';
import { InitOptions, login, User } from 'nativescript-plugin-firebase';
import { StoreService } from './core/services/store/store.service';

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent extends SubscriptionBase{
    public sideDrawerTransition: DrawerTransitionBase;
    public loginState: LoginState;
    public authLevel: AuthLevel;

    private userListener = new Subscription();
    private loginStateListener = new Subscription();
    private user: User;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private storeService: StoreService,
        private authenticationService: AuthenticationService
    ) {
        super();
        this.initialise();
        this.listenForApplicationEvents();
    }

    ngOnInit(): void {
        this.sideDrawerTransition = new SlideInOnTopTransition();
    }

    private listenForApplicationEvents() {
        on(resumeEvent, this.onApplicationResume);
    }

    private onApplicationResume() {
        console.log('THE APP HAS BEEN RESUMED');
    }

    private initialise(): Promise<any> {
         this.listenForLoginState();
        return firebase.init({
            onAuthStateChanged: (data) => {
                this.authenticationService.setUser(data.user);
            }
        })
        .then(() => this.onFirebaseInit())
        .catch(error => this.onFirebaseInitError(error));
    }

    private listenForLoginState(): void {
        this.loginStateListener.unsubscribe();

        this.loginStateListener = this.authenticationService.loginState
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(loginState => {
                if (loginState && this.loginState !== loginState) {    
                    this.loginState = loginState;
                    console.log(`Login State Changed To ${loginState}`);
                    if (this.loginState === LoginState.loggedOut || this.loginState === LoginState.loggedInEmailUnVerified || this.loginState === LoginState.noCredentials) {
                        console.log('navigating to account because login state changed');
                        this.navigateTo('account') // TODO - This is the default page when loading up the app.
                    }

                    if (this.loginState === LoginState.loggedInEmailVerified) {
                        console.log('navigating to stores because the login state changed to logged in email verified');
                        this.navigateTo('stores');
                    }
                }
            });
    }

    private onFirebaseInit(): void {
        this.authenticationService.initialise()
            .then(() => this.listenForLoginState());
    }

    private onFirebaseInitError(error: string) {
        if (error === 'Firebase already initialized') {
            this.authenticationService.initialise()
                .then(() => this.listenForLoginState());
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
}
