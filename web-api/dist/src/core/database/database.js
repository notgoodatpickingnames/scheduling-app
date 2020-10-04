"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const environment_1 = require("../../../environment");
const msnodesqlv8_1 = require("mssql/msnodesqlv8");
const sqlRequestFactory_1 = require("./sqlRequestFactory");
// import { dbConfig } from "../../environment";
class Database {
    // public executeStoredProcedureWithResult<T>(storedProcedureName: string, params: object, projection: T): Promise<T> {
    //     return this.connect()
    //         .then(pool => {
    //             const request = SqlRequestFactory.CreateWithOutput(pool, params, projection);
    //             request.execute(storedProcedureName)
    //                 .then(result => console.log(result))
    //                 .catch(error => console.log(error));
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             return null;
    //         })
    // }
    executeStoredProcedure(storedProcedureName, params) {
        console.log('wtf');
        return this.connect()
            .then(pool => {
            sqlRequestFactory_1.SqlRequestFactory.Create(pool, params)
                .execute(storedProcedureName)
                .then(result => {
                console.log(result);
                console.table(result.recordset);
            })
                .catch(error => console.log(error));
        })
            .catch(error => {
            console.log(error);
            return null;
        });
    }
    connect() {
        console.log('trying to connect');
        const pool = new msnodesqlv8_1.ConnectionPool(environment_1.sqlConnectionString);
        return pool.connect()
            .then(() => {
            return pool;
        })
            .catch(error => {
            console.log(error);
            throw new Error(`Connect failed with string ${environment_1.sqlConnectionString}`);
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map