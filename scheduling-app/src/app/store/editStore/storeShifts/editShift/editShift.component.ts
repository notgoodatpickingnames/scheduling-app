import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeyboardType } from '~/app/core/FormComponents/textField/keyboardType';
import { Shift } from '~/app/core/services/shift/shift';
import { RecurrenceType } from '~/app/core/services/shift/recurrenceType';
import { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } from '~/app/core/days';
import { ValueList } from 'nativescript-drop-down';
import { ShiftsService } from '~/app/core/services/shift/shifts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionBase } from '~/app/core/subscriptionBase';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ns-edit-shift',
  templateUrl: './editShift.component.html',
  styleUrls: ['./editShift.component.css']
})
export class EditShiftComponent extends SubscriptionBase implements AfterViewInit {
  @ViewChild(NgForm, {read: NgForm, static: false}) public form: NgForm;

  public numberKeyboardType = KeyboardType.number;
  public shift = Shift.constructNew();

  private everyYear = {value: RecurrenceType.EveryYear, display: RecurrenceType.EveryYear};
  private everyMonth = {value: RecurrenceType.EveryMonth, display: RecurrenceType.EveryMonth};
  private everyWeek = {value: RecurrenceType.EveryWeek, display: RecurrenceType.EveryWeek};
  // private everyOddWeek = {value: RecurrenceType.EveryOddWeek, display: RecurrenceType.EveryOddWeek};
  // private everyEvenWeek = {value: RecurrenceType.EveryEvenWeek, display: RecurrenceType.EveryEvenWeek};
  private once = {value: RecurrenceType.OneTime, display: RecurrenceType.OneTime};

  private monday = {value: Monday, display: Monday};
  private tuesday = {value: Tuesday, display: Tuesday};
  private wednesday = {value: Wednesday, display: Wednesday};
  private thursday = {value: Thursday, display: Thursday};
  private friday = {value: Friday, display: Friday};
  private saturday = {value: Saturday, display: Saturday};
  private sunday = {value: Sunday, display: Sunday};
  private recurrenceTypes = [this.everyYear, this.everyMonth, this.everyWeek, this.once];
  private dayArray = [ this.sunday, this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday];
  public recurrenceTypesAsValueList = new ValueList<RecurrenceType>(this.recurrenceTypes);
  public daysOfWeek = new ValueList<string>(this.dayArray);

  public selectedTypeIndex: number = 0;

  private storeId: string;
  private shiftId: string;

  constructor(private shiftsService: ShiftsService,
    private route: ActivatedRoute,
    private router: Router) {
        super();
    }

    public ngAfterViewInit() {
        this.route.params.pipe(takeUntil(this.componentDestroyed)).subscribe(params => {
            this.storeId = params['storeId'];
            this.shiftId = params['shiftId'];
            this.shiftsService.get(this.storeId, this.shiftId).pipe(takeUntil(this.componentDestroyed)).subscribe(shift => {
                setTimeout(() => {
                    this.shift = shift;
                    this.selectedTypeIndex = this.recurrenceTypes.findIndex(type => type.value === this.shift.recurrenceType);
                }, 0);
            });
        });
    }

    public onSubmit() {
        // Fire validation on all fields
        // If all fields are valid then pupdate
        this.shiftsService.update(this.shift, this.storeId);
        this.onBackAction();
    }

    public onBackAction() {
        this.router.navigate(['../../'], {relativeTo: this.route});
    }

    public get isEveryYear(): boolean {
        return this.shift.recurrenceType === RecurrenceType.EveryYear;
    }

    public get isEveryMonth(): boolean {
        return this.shift.recurrenceType === RecurrenceType.EveryMonth;
    }

    public get isEveryWeek(): boolean {
        return this.shift.recurrenceType === RecurrenceType.EveryWeek;
    }

    public get isOnce(): boolean {
        return this.shift.recurrenceType === RecurrenceType.OneTime;
    }
}
