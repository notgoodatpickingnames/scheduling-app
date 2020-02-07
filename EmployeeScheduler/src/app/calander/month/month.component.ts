import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CalanderContext } from '../calanderContext';
import { Week } from '../models/week';
import { Month } from '../models/month';

@Component({
  selector: 'ns-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  @Input() set startMonth(startMonth: Date) { // This should only trigger once ideally.
    this.month = new Month(startMonth.getFullYear(), startMonth.getMonth());
  }
  public month: Month;
  public context: CalanderContext = CalanderContext.Month;
  
  public testList: number[]= [];

  constructor() { 
    for (let i = 0; i < 100; i++) {
      console.log('adding to the test list');
      this.testList.push(i);
    }
  }

  ngOnInit() {}

  public get nameOfMonth(): string {
    return this.month.name;
  }

  public onNextMonthClick() {

  }

  public onPreviousMonthClick() {
    
  }
}
