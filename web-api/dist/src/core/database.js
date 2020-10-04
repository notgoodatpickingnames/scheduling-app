"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const environment_1 = require("../../environment");
const msnodesqlv8_1 = require("mssql/msnodesqlv8");
// import { dbConfig } from "../../environment";
class Database {
    constructor() {
        this.testQuery = "SELECT name FROM sys.databases";
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            const pool = new msnodesqlv8_1.ConnectionPool(environment_1.sqlConnectionString);
            pool.connect()
                .then(() => {
                this.runTestQuery(pool);
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
    runTestQuery(pool) {
        pool.request().query(this.testQuery)
            .then(result => {
            console.log(result);
            pool.close();
        })
            .catch(error => {
            console.log(error);
            pool.close();
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map