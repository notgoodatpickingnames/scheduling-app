import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Month } from '../models/month';

@Component({
  selector: 'ns-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements AfterViewInit {

  // TODO- The commented pieces below are to be used after the mvp is finished, they will help in animating the months from right to left.
  // @ViewChildren(MonthDaySelectorComponent, {read: MonthDaySelectorComponent})
  //   daySelectorComponents: QueryList<MonthDaySelectorComponent>;
  // @ViewChild("daySelectorDiv", {read: StackLayout, static: false}) daySelectorArea: StackLayout;
  @Input() set startMonth(startMonth: Date) { // This should only trigger once ideally.
    this.month = new Month(startMonth.getFullYear(), startMonth.getMonth());
  }
  public month: Month;
  
  constructor() {
  }

  ngAfterViewInit() {
  }

  public get nameOfMonth(): string {
    return this.month.name;
  }

  public onNextMonthClick() {
    this.month = new Month(this.month.year, this.month.month + 1);
  }

  public onPreviousMonthClick() {
    this.month = new Month(this.month.year, this.month.month - 1);
  }
}
