import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const config = functions.config();
const app = admin.initializeApp(config.firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    const data = request.body.data;
    response.send({data: {myGuy: 'Hello from the beyond', yoGuy: `${data.t1}`}});
});

// export const createStore = functions.database.ref('stores/').onCreate((snapshot, context) => {
//     const newStore = snapshot.val();

// });
