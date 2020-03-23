import { Injectable, NgZone } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Observable, throwError, BehaviorSubject, ReplaySubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Shift } from "./shift";

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

    public shift$ = new ReplaySubject<Shift[]>(1);

    private _path = "shifts";
  
    constructor(private _ngZone: NgZone) {}

    public initialise(): void {
        this.load().subscribe(shifts => {
                this.shift$.next(shifts); 
            });
    }

    public push(shift: Shift) {
        firebase.push(this._path, shift.asInterface());
    }

    public update(shift: Shift) {
        firebase.update(`${this._path}/${shift.id}`, shift.asInterface())
    }
  
    public get(id: string): Observable<Shift> {
        return this.shift$.pipe(map(shifts => shifts.find(shift => shift.id === id)));
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
