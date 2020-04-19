import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedIndexChangedEventData } from 'tns-core-modules/ui/tabs/tabs';
import { StoresTabService } from './storesTab.service';
import { StoreService } from '../core/services/store/store.service';
import { SubscriptionBase } from '../core/subscriptionBase';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent extends SubscriptionBase {

    private static storeListener = new Subscription();

    constructor(private router: Router,
        private route: ActivatedRoute,
        private storeService: StoreService,
        public storesTabService: StoresTabService) {
            super();
            this.listenForStores();
    }

    public onCreateShiftTap() {
        this.router.navigate(['./create'], {relativeTo: this.route});
    }

    public onIndexChanged(event: SelectedIndexChangedEventData) {
        console.log('set the selected index');
        this.storesTabService.selectedIndex = event.newIndex;
    }

    public listenForStores() {
        StoreComponent.storeListener.unsubscribe();
        StoreComponent.storeListener = this.storeService.store$.pipe(takeUntil(this.componentDestroyed)).subscribe(stores => {
            stores.forEach(store => console.log(`STORES HAVE BEEN GOT ${store.storeName}`));
        });
    }
}
