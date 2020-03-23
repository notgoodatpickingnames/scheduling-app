import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeyboardType } from '~/app/FormComponents/textField/keyboardType';
import { Shift } from '~/app/services/shift/shift';
import { ShiftType } from '~/app/services/shift/shiftType';
import { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } from '~/app/core/days';
import { ValueList } from 'nativescript-drop-down';
import { ShiftsService } from '~/app/services/shift/shifts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ns-edit-shift',
  templateUrl: './editShift.component.html',
  styleUrls: ['./editShift.component.css']
})
export class EditShiftComponent implements AfterViewInit {
  @ViewChild(NgForm, {read: NgForm, static: false}) public form: NgForm;

  public numberKeyboardType = KeyboardType.number;
  public textKeyboardType = KeyboardType.text;
  public shift = Shift.constructNew();

  private everyYear = {value: ShiftType.EveryYear, display: ShiftType.EveryYear};
  private everyMonth = {value: ShiftType.EveryMonth, display: ShiftType.EveryMonth};
  private everyWeek = {value: ShiftType.EveryWeek, display: ShiftType.EveryWeek};
  private everyOtherWeek = {value: ShiftType.EveryOtherWeek, display: ShiftType.EveryOtherWeek};
  private once = {value: ShiftType.OneTime, display: ShiftType.OneTime};

  private monday = {value: Monday, display: Monday};
  private tuesday = {value: Tuesday, display: Tuesday};
  private wednesday = {value: Wednesday, display: Wednesday};
  private thursday = {value: Thursday, display: Thursday};
  private friday = {value: Friday, display: Friday};
  private saturday = {value: Saturday, display: Saturday};
  private sunday = {value: Sunday, display: Sunday};
  private typesArray = [this.everyYear, this.everyMonth, this.everyWeek, this.everyOtherWeek, this.once];
  private dayArray = [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday];
  public typesAsValueList = new ValueList<ShiftType>(this.typesArray);
  public daysOfWeek = new ValueList<string>(this.dayArray);

  public selectedTypeIndex: number = 0;

  constructor(private shiftsService: ShiftsService,
    private route: ActivatedRoute,
    private router: Router) {}

    public ngAfterViewInit() {
        this.route.params.subscribe(params => {
            const shiftId = params['id'];
            this.shiftsService.get(shiftId).subscribe(shift => {
                setTimeout(() => {
                    this.shift = shift;
                    this.selectedTypeIndex = this.typesArray.findIndex(type => type.value === this.shift.type);
                }, 0);
            });
        });
    }

    public onSubmit() {
        // Fire validation on all fields
        // If all fields are valid then pupdate
        this.shiftsService.update(this.shift);
        this.onBackAction();
    }

    public onBackAction() {
        this.router.navigate(['../../'], {relativeTo: this.route});
    }

    public get isEveryYear(): boolean {
        return this.shift.type === ShiftType.EveryYear;
    }

    public get isEveryMonth(): boolean {
        return this.shift.type === ShiftType.EveryMonth;
    }

    public get isEveryWeek(): boolean {
        return this.shift.type === ShiftType.EveryWeek;
    }

    public get isEveryOtherWeek(): boolean {
        return this.shift.type === ShiftType.EveryOtherWeek;
    }

    public get isOnce(): boolean {
        return this.shift.type === ShiftType.OneTime;
    }
}
