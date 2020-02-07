import { Component, OnInit } from '@angular/core';
import { CalanderContext } from '../calanderContext';
import { Week } from '../models/week';
import { Month } from '../models/month';

@Component({
  selector: 'ns-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
    
  public month: Month;
  public context: CalanderContext = CalanderContext.Month;
  
  constructor() { }

  ngOnInit() {
    
    const month = new Month(2020, 1);
    
  }

}
