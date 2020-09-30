import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { storeRoutesConfig } from "./stores/storeRoutesConfig";
import { port } from "../environment";

const app = express();

// define a route handler for the default home page
app.use(bodyParser.json());
app.use(cors({ origin: true }));
storeRoutesConfig(app);

// start the Express server
app.listen(port, () => {
    console.log(`server started at fuck http://localhost:${port}`);
});