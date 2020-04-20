import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '~/app/core/services/store/store';

@Component({
  selector: 'ns-store-detail',
  templateUrl: './storeDetail.component.html',
  styleUrls: ['./storeDetail.component.css']
})
export class StoreDetailComponent {
    @Input() public store = Store.constructNew();
    @Output() public storeChange = new EventEmitter<Store>();
}
