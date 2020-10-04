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
const environment_1 = require("../../../environment");
const msnodesqlv8_1 = require("mssql/msnodesqlv8");
// import { dbConfig } from "../../environment";
class Database {
    constructor() {
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            this.executeStoredProcedure("stores.usp_InsertStore", {});
        });
    }
    executeStoredProcedure(storedProcedureName, params) {
        return this.connect()
            .then(pool => {
            return pool.request()
                .input('name', msnodesqlv8_1.NVarChar, 'STORE NAME TEST')
                .input('description', msnodesqlv8_1.NVarChar, 'store description test')
                .execute(storedProcedureName)
                .then(result => console.log(result))
                .catch(error => console.log(error));
        })
            .catch(error => {
            console.log(error);
            return null;
        });
    }
    connect() {
        const pool = new msnodesqlv8_1.ConnectionPool(environment_1.sqlConnectionString);
        return pool.connect()
            .then(() => {
            return pool;
        })
            .catch(error => {
            console.log(error);
            return null;
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map