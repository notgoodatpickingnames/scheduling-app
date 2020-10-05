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
const sqlRequestFactory_1 = require("./sqlRequestFactory");
class Database {
    constructor() { }
    executeStoredProcedureWithResult(storedProcedureName, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionPool = yield this.connect();
                const request = sqlRequestFactory_1.SqlRequestFactory.Create(connectionPool, params);
                const requestResult = yield request.execute(storedProcedureName);
                const projection = this.convertRecordSetResultToProjection(requestResult.recordset);
                return projection;
            }
            catch (error) {
                throw new Error(`Failed To Execute Stored Procedure ${error}`);
            }
        });
    }
    executeStoredProcedureWithResults(storedProcedureName, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionPool = yield this.connect();
                const request = sqlRequestFactory_1.SqlRequestFactory.Create(connectionPool, params);
                const requestResult = yield request.execute(storedProcedureName);
                const projections = this.convertRecordSetResultsToProjections(requestResult.recordset);
                return projections;
            }
            catch (error) {
                throw new Error(`Failed To Execute Stored Procedure: ${error}`);
            }
        });
    }
    executeStoredProcedure(storedProcedureName, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionPool = yield this.connect();
                const request = sqlRequestFactory_1.SqlRequestFactory.Create(connectionPool, params);
                yield request.execute(storedProcedureName);
            }
            catch (error) {
                throw new Error(`Failed To Execute Stored Procedure: ${error}`);
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = new msnodesqlv8_1.ConnectionPool(environment_1.sqlConnectionString);
            try {
                yield pool.connect();
                return pool;
            }
            catch (error) {
                throw new Error(`Failed To connect To DB ${error}`);
            }
        });
    }
    convertRecordSetResultToProjection(resultSet) {
        if (resultSet.length === 1) {
            return this.convertToProjection(resultSet[0]);
        }
        if (resultSet.length > 1) {
            throw new Error('Too many results returned');
        }
        return undefined;
    }
    convertRecordSetResultsToProjections(resultSet) {
        const projections = [];
        resultSet.forEach(result => {
            projections.push(this.convertToProjection(result));
        });
        return projections;
    }
    convertToProjection(object) {
        const newObject = {};
        Object.keys(object).forEach(key => {
            const lowerCasedFirstLetterKey = key.charAt(0).toLocaleLowerCase() + key.slice(1);
            newObject[lowerCasedFirstLetterKey] = object[key];
        });
        return newObject;
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map