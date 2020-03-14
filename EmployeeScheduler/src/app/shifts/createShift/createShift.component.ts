import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'ns-createShift',
    templateUrl: './createShift.component.html',
    styleUrls: ['./createShift.component.css']
})
export class CreateShiftComponent implements OnInit {
    @ViewChild(NgForm, {read: NgForm, static: false}) public form: NgForm;

    public test: string;

    constructor() { }

    ngOnInit() {

    }

    public onSubmit() {
        // this.form.form.su;
        alert('the form has been submitted');
        alert(this.form.form.valid);
    }

}
