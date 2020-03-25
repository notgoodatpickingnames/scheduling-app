import * as firebase from 'nativescript-plugin-firebase';
import * as dialogs from 'tns-core-modules/ui/dialogs';
export class AccountService {
    constructor() {

    }

    public createUserByEmail(email: string, password: string) {
        firebase.createUser({
            email: email,
            password: password
          }).then(
              function (user) {
                dialogs.alert({
                  title: "User created",
                  message: "email: " + user.email,
                  okButtonText: "Nice!"
                })
              },
              function (errorMessage) {
                dialogs.alert({
                  title: "No user created",
                  message: errorMessage,
                  okButtonText: "OK, got it"
                })
              }
          );
    }
}
