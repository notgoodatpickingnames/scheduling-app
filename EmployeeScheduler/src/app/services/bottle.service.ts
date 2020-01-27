// import { Injectable, NgZone } from "@angular/core";
// import * as firebase from "nativescript-plugin-firebase";
// import { Observable, throwError, BehaviorSubject } from "rxjs";
// import { catchError } from "rxjs/operators";
// import { Bottle } from "../models/bottle";
// import { objectdetection } from "nativescript-plugin-firebase/mlkit";


// export class BottleService {

//     private _path = "bottles";
//     private _bottles: Bottle[];

//     constructor(private _ngZone: NgZone) {}

//     public push(bottle: Bottle) {
//         Object.keys(bottle).forEach(key => console.log(key));
//         firebase.push(this._path, bottle);
//     }

//     public get(bottleId: string) {
//         firebase.getValue(`/bottles/${bottleId}`);
//     }

//     public load(): Observable<any> {
//         return new Observable((observer: any) => {

//             const onValueEvent =(snapshot: any) => {
//                 this._ngZone.run(() => {
//                     const results = this.handleSnapshot(snapshot.value);
//                     observer.next(results);
//                 })
//             }
//             firebase.addValueEventListener(onValueEvent, `/${this._path}`);
//         })
//         .pipe(catchError(this.handleErrors));
//     }

//     private handleErrors(error: Response): Observable<never> {
//         return throwError(error);
//     }

//     private handleSnapshot(data: any): Bottle[] {
//         this._bottles = [];

//         if (data) {
//             for(const id in data) {
//                 if (data.hasOwnProperty(id)) {
//                     this._bottles.push(new Bottle(data[id]));
//                 }
//             }
//         }

//         return this._bottles;
//     }
// }
