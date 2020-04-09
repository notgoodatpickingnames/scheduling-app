import { Component, OnInit, Input } from '@angular/core';
import { Month } from '../../models/month';

@Component({
  selector: 'ns-month-day-selector',
  templateUrl: './monthDaySelector.component.html',
  styleUrls: ['./monthDaySelector.component.css']
})
export class MonthDaySelectorComponent implements OnInit {
  @Input() month: Month;

  constructor() { }

  ngOnInit() {
  }

}
