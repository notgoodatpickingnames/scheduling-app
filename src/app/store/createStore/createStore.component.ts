import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '~/app/core/services/store/store';
import { KeyboardType } from '~/app/core/FormComponents/textField/keyboardType';
import { StoreService } from '~/app/core/services/store/store.service';
import * as firebase from 'nativescript-plugin-firebase';
import { SubscriptionBase } from '~/app/core/subscriptionBase';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';
import { User } from 'nativescript-plugin-firebase';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginState } from '~/app/core/services/authentication/loginState';

@Component({
  selector: 'ns-createStore',
  templateUrl: './createStore.component.html',
  styleUrls: ['./createStore.component.css']
})
export class CreateStoreComponent extends SubscriptionBase {
    public store = Store.constructNew();

    private user: User;
    private loginState: LoginState;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private storeService: StoreService,
        private authenticationService: AuthenticationService) {
            super();
            this.listenForAuthorization();
    }

    public onBackAction() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    public onSubmit() {
        if (this.user && this.loginState === LoginState.loggedInEmailVerified) {
            this.storeService.create(this.store).then();
        }
    }

    private listenForAuthorization() {
        combineLatest(
            this.authenticationService.user.pipe(takeUntil(this.componentDestroyed)),
            this.authenticationService.loginState.pipe(takeUntil(this.componentDestroyed)),
            ).subscribe(response => {
                this.user = response[0];
                this.loginState = response[1];
                if (this.user && this.loginState === LoginState.loggedInEmailVerified) {
                    this.store.setOwnerAsOnlyUser(this.user.uid, this.user.displayName)
                }
            });
    }
}
