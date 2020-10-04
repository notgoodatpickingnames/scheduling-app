"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const storeRoutesConfig_1 = require("./stores/storeRoutesConfig");
const environment_1 = require("../environment");
const database_1 = require("./core/database/database");
const app = express_1.default();
// define a route handler for the default home page
app.use(body_parser_1.default.json());
app.use(cors_1.default({ origin: true }));
storeRoutesConfig_1.storeRoutesConfig(app);
// start the Express server
app.listen(environment_1.port, () => {
    console.log(`server started at http://localhost:${environment_1.port}`);
});
const database = new database_1.Database();
database.run();
//# sourceMappingURL=index.js.map