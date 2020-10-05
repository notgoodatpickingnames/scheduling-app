import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedIndexChangedEventData } from 'tns-core-modules/ui/tabs/tabs';
import { StoresTabService } from './storesTab.service';
import { StoreService } from '../core/services/store/store.service';
import { SubscriptionBase } from '../core/subscriptionBase';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User as FireBaseUser } from 'nativescript-plugin-firebase';
import { AuthenticationService } from '../core/services/authentication/authentication.service';
import { User } from '../core/services/store/user';
import { StoreAuthLevel } from '../core/services/store/storeAuthLevel';
import { Store } from '../core/services/store/store';
import { StoreRepository } from './store.repository';
import { UsersService } from '../core/services/user/users.service';

@Component({
  selector: 'ns-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent extends SubscriptionBase {

    private static storeListener = new Subscription();
    private static userListener = new Subscription();
    private user: User;

    public stores: Store[] = [];

    constructor(private router: Router,
        private route: ActivatedRoute,
        private storeService: StoreService,
        private authenticationService: AuthenticationService,
        private userService: UsersService,
        public storesTabService: StoresTabService,
        private storeRepository: StoreRepository) {
            super();

            console.log('GETTING THE STORES');
            this.storeRepository.list().subscribe(stores => {
                stores.forEach(store => {
                    console.log(`Store ${JSON.stringify(store)}`);
                });
            });
            // this.listenForUser();
    }

    public onCreateShiftTap() {
        this.router.navigate(['./create'], {relativeTo: this.route});
    }

    public onEditShiftTap(storeId: string) {
        console.log(`going to edit store id ${storeId}`);
        this.router.navigate([`./edit/${storeId}`], {relativeTo: this.route});
    }

    public onIndexChanged(event: SelectedIndexChangedEventData) {
        this.storesTabService.selectedIndex = event.newIndex;
    }

    private listenForUser()  {
        StoreComponent.userListener.unsubscribe();
        StoreComponent.userListener = this.authenticationService.user
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(user => {
                if (user) {
                    console.log(`GETTING THE LIST ${user.uid}`);
                    this.storeRepository.list();
                }
            });
    }

    public listenForStores(userId: string) {
        StoreComponent.storeListener.unsubscribe();
        StoreComponent.storeListener = this.storeService.store$
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(stores => {
                console.log(`Store 1: ${stores[0].storeName}, Store 2: ${stores[1].storeName}`);
                this.stores = stores;
                this.stores.forEach(store => store.setStoreAuthLevelMessage(userId));
            });
    }
}
