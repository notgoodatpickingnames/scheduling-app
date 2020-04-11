import { Component, OnInit, Input } from '@angular/core';
import { Shift } from '~/app/core/services/shift/shift';

@Component({
  selector: 'ns-day-card',
  templateUrl: './dayCard.component.html',
  styleUrls: ['../cardStyles.css']
})
export class DayCardComponent {
    @Input() shift: Shift;
}
