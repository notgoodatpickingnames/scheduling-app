"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRoutesConfig = void 0;
const storeController_1 = require("./storeController");
// import { isAuthorized } from "../auth/authorized";
function storeRoutesConfig(app) {
    app.get('/store', 
    // isAuthenticated,
    storeController_1.list);
}
exports.storeRoutesConfig = storeRoutesConfig;
//# sourceMappingURL=storeRoutesConfig.js.map