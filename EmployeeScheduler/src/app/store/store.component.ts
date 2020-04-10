import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedIndexChangedEventData } from 'tns-core-modules/ui/tabs/tabs';
import { StoresTabService } from './storesTab.service';

@Component({
  selector: 'ns-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {

    constructor(private router: Router,
        private route: ActivatedRoute,
        public storesTabService: StoresTabService) {
    }

    public onCreateShiftTap() {
        this.router.navigate(['./create'], {relativeTo: this.route});
    }

    public onIndexChanged(event: SelectedIndexChangedEventData) {
        this.storesTabService.selectedIndex = event.newIndex;
    }
}
