import { Component, OnInit, Input } from '@angular/core';
import { Shift } from '~/app/services/shift/shift';

@Component({
  selector: 'ns-date-card',
  templateUrl: './dateCard.component.html',
  styleUrls: ['../cardStyles.css']
})
export class DateCardComponent {
    @Input() shift: Shift;
}
