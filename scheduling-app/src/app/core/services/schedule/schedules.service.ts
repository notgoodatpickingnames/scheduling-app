import { Injectable, NgZone } from '@angular/core';
import { ReplaySubject, Observable, throwError } from 'rxjs';
import { Schedule } from './schedule';
import { SubscriptionBase } from '../../subscriptionBase';
import { takeUntil, map, catchError } from 'rxjs/operators';
import * as firebase from "nativescript-plugin-firebase";

@Injectable({
    providedIn: 'root'
})
export class SchedulesService extends SubscriptionBase {

    public schedule$ = new ReplaySubject<Schedule[]>(1);

    private _path = "schedules";

    constructor(private _ngZone: NgZone) {super()}

    public initialise(): void {
        this.load().pipe(takeUntil(this.componentDestroyed)).subscribe(schedules => {
            this.schedule$.next(schedules);
        });
    }

    public push(schedule: Schedule) {
        firebase.push(this._path, schedule.asInterface());
    }

    public update(schedule: Schedule) {
        firebase.update(`${this._path}/${schedule.scheduleId}`, schedule.asInterface())
    }

    public get(id: string): Observable<Schedule> {
        return this.schedule$.pipe(map(schedules => schedules.find(schedule => schedule.scheduleId === id)));
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

    private handleSnapshot(data: any): Schedule[] {
        const schedules = [];

        if (data) {
            for(const id in data) {
                if (data.hasOwnProperty(id)) {
                    const scheduleToPush = new Schedule(data[id], id);
                    schedules.push(scheduleToPush);
                }
            }
        }

        return schedules;
    }
}
