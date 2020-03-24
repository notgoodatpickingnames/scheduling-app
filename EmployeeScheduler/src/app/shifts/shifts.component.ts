import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Tabs, SelectedIndexChangedEventData } from 'tns-core-modules/ui/tabs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ns-shifts',
    templateUrl: './shifts.component.html',
    styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements AfterViewInit {
    public selectedTab = 1;

    constructor(private router: Router,
        private route: ActivatedRoute) {
    }

    ngAfterViewInit() {
    }

    public onCreateShiftTap() {
        this.router.navigate(['./create'], {relativeTo: this.route});
    }

    public onIndexChanged(event: SelectedIndexChangedEventData) {
        this.selectedTab = event.newIndex;
    }
}
