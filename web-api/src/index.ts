import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { storeRoutesConfig } from "./stores/storeRoutesConfig";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.use(bodyParser.json());
app.use(cors({ origin: true }));
storeRoutesConfig(app);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});