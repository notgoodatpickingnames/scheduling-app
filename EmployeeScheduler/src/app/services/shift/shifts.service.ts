import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Observable, throwError, BehaviorSubject, ReplaySubject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Shift } from "./shift";

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

    public shift$ = new ReplaySubject<Shift[]>(1);
    private _path = "shifts";
  
    constructor(private _ngZone: NgZone) {
        this.shift$.next([]);
    }

    public initialise(): void {
        alert('called init on service');
        this.load().subscribe(shifts => {
                this.shift$.next(shifts); 
                alert('shift is being sent out');
            });
    }

    public push(shift: Shift) {
        Object.keys(shift).forEach(key => console.log(key));
        firebase.push(this._path, shift);
    }
  
    public get(shiftId: string) {
        firebase.getValue(`${this._path}${shiftId}`);
    }
  
    private load(): Observable<any> {
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
  
    private handleErrors(error: Response): Observable<never> {
        alert(error.text);
        return throwError(error);
    }
  
    private handleSnapshot(data: any): Shift[] {
        const shifts = [];

        if (data) {
            for(const id in data) {
                if (data.hasOwnProperty(id)) {
                    const shiftToPush = new Shift(data[id]);
                    shifts.push(shiftToPush);
                }
            }
        }

        return shifts;
    }
}
