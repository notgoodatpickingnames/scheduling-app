import { Component, OnInit } from '@angular/core';
import { StoreService } from '~/app/core/services/store/store.service';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionBase } from '~/app/core/subscriptionBase';
import { Store } from '~/app/core/services/store/store';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { User } from '~/app/core/services/store/user';
import { StoreAuthLevel } from '~/app/core/services/store/storeAuthLevel';

@Component({
    selector: 'ns-editStore',
    templateUrl: './editStore.component.html',
    styleUrls: ['./editStore.component.css']
})
export class EditStoreComponent extends SubscriptionBase {
    public store = Store.constructNew();
    public selectedIndex = 0;
    public user = User.constructNew();

    constructor(private storeService: StoreService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router) {
            super();
            this.getStore();
    }

    public onBackAction() {
        this.router.navigate(['../../'], {relativeTo: this.route});
    }

    public get showShifts(): boolean {
        return this.user.storeAuthLevel === StoreAuthLevel.owner || this.user.storeAuthLevel === StoreAuthLevel.manager;
    }

    public get showUsers(): boolean {
        return this.user.storeAuthLevel === StoreAuthLevel.owner || this.user.storeAuthLevel === StoreAuthLevel.manager;
    }

    private getStore() {
        combineLatest(this.route.params, this.authenticationService.user)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(response => {
                const params = response[0];
                const user = response[1];
                const storeId = params['storeId'];
                const userId = user.uid;
                // this.storeService.get(storeId).then(store => {
                //     this.store = store;
                //     this.user = this.store.getUser(userId);
                // })
            })
    }
}
