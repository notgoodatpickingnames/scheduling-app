import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '~/app/core/services/store/store';

@Component({
  selector: 'ns-store-users',
  templateUrl: './storeUsers.component.html',
  styleUrls: ['./storeUsers.component.css']
})
export class StoreUsersComponent{
    @Input() public store = Store.constructNew();
    @Output() public storeChange = new EventEmitter<Store>();
}
