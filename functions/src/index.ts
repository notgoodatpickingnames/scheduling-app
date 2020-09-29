import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { storeRoutesConfig } from './stores/storeRoutesConfig';
// import { userRoutesConfig } from './users/userRoutesConfig';

admin.initializeApp();

const app = express();

var port = process.env.port || 3300
app.listen(port, () => {
    console.log("Hi This port is running", port);
});

app.use(bodyParser.json());
app.use(cors({ origin: true }));
storeRoutesConfig(app);

export const api = functions.https.onRequest(app);