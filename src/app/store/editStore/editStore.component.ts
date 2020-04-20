import { Component, OnInit } from '@angular/core';
import { StoreService } from '~/app/core/services/store/store.service';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionBase } from '~/app/core/subscriptionBase';
import { Store } from '~/app/core/services/store/store';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'ns-editStore',
    templateUrl: './editStore.component.html',
    styleUrls: ['./editStore.component.css']
})
export class EditStoreComponent extends SubscriptionBase {
    public store = Store.constructNew();
    public selectedIndex = 0;

    constructor(private storeService: StoreService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router) {
            super();
            console.log('editing a store');
            this.getStore();
    }

    public onBackAction() {
        this.router.navigate(['../../'], {relativeTo: this.route});
    }

    private getStore() {
        this.route.params.pipe(takeUntil(this.componentDestroyed))
            .subscribe(params => {
                console.log(`Params ${params['id']}`);
                this.storeService.get(params['id']).then(store => {
                    this.store = store;
                })
            })
    }
}
