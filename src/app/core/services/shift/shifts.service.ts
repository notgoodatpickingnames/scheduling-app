import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Observable, throwError, BehaviorSubject, ReplaySubject } from "rxjs";
import { catchError, map, takeUntil } from "rxjs/operators";
import { Shift } from "./shift";
import { SubscriptionBase } from "~/app/core/subscriptionBase";

@Injectable({
  providedIn: 'root'
})
export class ShiftsService extends SubscriptionBase {
    public shift$ = new ReplaySubject<Shift[]>(1);

    private _storePath = "stores";
    private _shiftPath = "shifts";

    constructor(private _ngZone: NgZone) {super()}

    public push(shift: Shift, storeId: string) {
        firebase.push(`${this._storePath}/${storeId}/${this._shiftPath}`, shift.asInterface());
    }

    public update(shift: Shift, storeId: string) {
        firebase.update(`${this._storePath}/${storeId}/${this._shiftPath}/${shift.shiftId}`, shift.asInterface())
    }

    public get(storeId: string, shiftId: string): Observable<Shift> {
        return undefined; // this.shift$.pipe(map(shifts => shifts.find(shift => shift.shiftId === id)));
    }

    public getShiftListener(storeId: string): Observable<any> {
        return new Observable((observer: any) => {

            const onValueEvent =(snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                })
            }
            firebase.addValueEventListener(onValueEvent, `/${this._storePath}/${storeId}/${this._shiftPath}`);
        })
        .pipe(catchError(this.handleErrors));
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }

    private handleSnapshot(data: any): Shift[] {
        const shifts = [];

        if (data) {
            for(const id in data) {
                if (data.hasOwnProperty(id)) {
                    const shiftToPush = new Shift(data[id], id);
                    shifts.push(shiftToPush);
                }
            }
        }

        return shifts;
    }
}
