import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '~/app/core/services/store/store';
import { KeyboardType } from '~/app/core/FormComponents/textField/keyboardType';

@Component({
  selector: 'ns-createStore',
  templateUrl: './createStore.component.html',
  styleUrls: ['./createStore.component.css']
})
export class CreateStoreComponent implements OnInit {
    public store = Store.constructNew();

    constructor(private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
    }

    public onBackAction() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

}
