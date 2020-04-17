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
import { takeUntil, skip } from 'rxjs/operators';
import { SubscriptionBase } from './core/subscriptionBase';
import { LoginState } from './core/services/authentication/loginState';
import { AuthLevel } from './core/services/authentication/authLevel';
import { InitOptions, login } from 'nativescript-plugin-firebase';
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
    }

    private initialise(): Promise<any> {
        this.listenForLoginState();
        return firebase.init({
            onAuthStateChanged: (data) => {
                this.authenticationService.setUser(data.user);
                this.onFirebaseInit();
            }
        })
        .then(() => this.onFirebaseInit())
        .catch(error => this.onFirebaseInitError(error));
    }

    private listenForLoginState(): void {
        this.authenticationService.loginState
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(loginState => {
                this.loginState = loginState;
                if (this.loginState === LoginState.loggedOut || this.loginState === LoginState.loggedInEmailUnVerified || this.loginState === LoginState.noCredentials) {
                    this.navigateTo('account') // Change this during dev.
                }

                if (this.loginState === LoginState.loggedInEmailVerified) {
                    this.navigateTo('stores/create');
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
        console.log('loading services');
        this.authenticationService.initialise()

        this.authenticationService.user.pipe(takeUntil(this.componentDestroyed))
            .subscribe(user => {
                if (user) {
                    this.storeService.initialise(user.uid);
                    this.storeService.store$.subscribe(stores => {
                        if (stores) {
                            stores.forEach(store => {
                                if (store) {
                                    console.log(`got a store back from the thing ${store.storeName}`);
                                }
                                else {
                                    console.log('the stores came back but aint no store');
                                }
                            });
                        }
                        
                    });
                }
            });
        
    }
}
