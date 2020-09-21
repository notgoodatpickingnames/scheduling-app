import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import * as firebase from "nativescript-plugin-firebase";
import { IdTokenResult } from "nativescript-plugin-firebase";

@Injectable({ providedIn: 'root' })
export class AuthTokenHttpInterceptor implements HttpInterceptor {
    private authToken = new BehaviorSubject<IdTokenResult>(undefined);

    constructor() {
        firebase.getAuthToken({})
            .then(idTokenResult => {
                this.authToken.next(idTokenResult);
            })
            .catch(error => console.log(error));
    }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return this.authToken.pipe(
           take(1),
           switchMap(idToken => {
               let clone = req.clone()
               if (idToken) {
                   clone = clone.clone({ headers: req.headers.set('Authorization', 'Bearer ' + idToken.token) });
               }
               return next.handle(clone)
           })
       )

   }
}

export const AuthTokenHttpInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenHttpInterceptor,
    multi: true
}
