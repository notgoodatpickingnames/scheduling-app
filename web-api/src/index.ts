import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { storeRoutesConfig } from "./stores/storeRoutesConfig";
import { port } from "../environment";
import { Database } from "./core/database/database";
import { StoreProjection } from "./stores/storeProjection";

const app = express();

// define a route handler for the default home page
app.use(bodyParser.json());
app.use(cors({ origin: true }));
storeRoutesConfig(app);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

const database = new Database();

database.executeStoredProcedure("stores.usp_InsertStore", {name: 'TEST', description: 'TEST TEST'});
const storesPromise = database.executeStoredProcedureWithResult<StoreProjection>(
        "stores.usp_GetStore", {storeId: '8B9DDE85-DFBB-452F-95BA-497D675C4962'});

storesPromise.then(stores => )


// database.executeStoredProcedureWithResult("stores.usp_InsertStore", {});