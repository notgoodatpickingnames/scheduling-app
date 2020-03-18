import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Shift } from "./shift";

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

    private _path = "shifts";
    private _shifts: Shift[];
  
    constructor(private _ngZone: NgZone) {}

    public push(shift: Shift) {
        Object.keys(shift).forEach(key => console.log(key));
        firebase.push(this._path, shift);
    }
  
    public get(shiftId: string) {
        firebase.getValue(`${this._path}${shiftId}`);
    }
  
    public load(): Observable<any> {
        return new Observable((observer: any) => {

            const onValueEvent =(snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                })
            }
            firebase.addValueEventListener(onValueEvent, `/${this._path}`);
        })
        .pipe(catchError(this.handleErrors));
    }

    public get shifts(): Shift[] {
        return this._shifts;
    }
  
    private handleErrors(error: Response): Observable<never> {
        alert(error.text);
        return throwError(error);
    }
  
    private handleSnapshot(data: any): Shift[] {
        this._shifts = [];

        if (data) {
            for(const id in data) {
                if (data.hasOwnProperty(id)) {
                    const shiftToPush = new Shift(data[id]);
                    this._shifts.push(shiftToPush);
                }
            }
        }

        return this._shifts;
    }
}
