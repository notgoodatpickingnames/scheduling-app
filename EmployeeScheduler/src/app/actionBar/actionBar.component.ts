import { Component, OnInit, Input } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";

@Component({
  selector: 'ns-action-bar',
  templateUrl: './actionBar.component.html',
  styleUrls: ['./actionBar.component.css']
})
export class ActionBarComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

}
