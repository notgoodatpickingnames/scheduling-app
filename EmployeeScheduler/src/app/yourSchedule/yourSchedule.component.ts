import { Component, OnInit, ViewChild } from '@angular/core';
import { CalanderComponent } from '../calander/calander.component';

@Component({
    selector: 'ns-yourSchedule',
    templateUrl: './yourSchedule.component.html',
    styleUrls: ['./yourSchedule.component.css']
})
export class YourScheduleComponent implements OnInit {
    @ViewChild(CalanderComponent, {read: CalanderComponent, static: false}) calander: CalanderComponent;

    public startDate: Date = new Date();

    constructor() {}

    ngOnInit() {
    }
}
