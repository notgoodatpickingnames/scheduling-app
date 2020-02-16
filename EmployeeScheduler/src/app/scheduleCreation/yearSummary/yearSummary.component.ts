import { Component, OnInit } from '@angular/core';
import { Year } from './models/year';
import { Week } from './models/week';
import { Month } from '~/app/calander/models/month';

@Component({
  selector: 'ns-year-summary',
  templateUrl: './yearSummary.component.html',
  styleUrls: ['./yearSummary.component.css']
})
export class YearSummaryComponent implements OnInit {

    public year = new Year(new Date().getFullYear());
    public month = new Date().getMonth();

    constructor() {
    }

    ngOnInit() {
    }

    public get weeks(): Week[] {
        console.log('getting into the weeks');
        return this.year.weeks ? this.year.weeks : [];
    }

    private buildMonths() {
    }



}
