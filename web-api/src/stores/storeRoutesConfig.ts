import { Application } from "express";
import { list } from "./storeController";
import { isAuthenticated } from "../auth/authenticated";
// import { isAuthorized } from "../auth/authorized";

export function storeRoutesConfig(app: Application) {
    app.get('/store',
        // isAuthenticated,
        list
    );
 }