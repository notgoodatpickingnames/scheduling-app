
import { sqlConnectionString } from "../../../environment";
import { ConnectionPool, Int, IRecordSet, NVarChar, VarChar } from "mssql/msnodesqlv8";
import { SqlRequestFactory } from "./sqlRequestFactory";
// import { dbConfig } from "../../environment";

export class Database {
    // Make a withResult and with Results to control typing better.
    public executeStoredProcedureWithResult<T>(storedProcedureName: string, params: object): Promise<T> | Promise<T[]> {
        return this.connect()
            .then(pool => {
                    SqlRequestFactory.Create(pool, params)
                    .execute(storedProcedureName)
                    .then(result => {
                        console.log(result);
                        console.table(result.recordset)
                        const resultsAsProjections = this.convertRecordSetResultToProjection<T>(result.recordset);
                        return resultsAsProjections;
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
                return null;
            })
    }

    public async executeStoredProcedure(storedProcedureName: string, params: object): Promise<void> {
        await this.connect()
            .then(pool => {
                    SqlRequestFactory.Create(pool, params)
                    .execute(storedProcedureName)
                    .then(result => {
                        console.log(result);
                        console.table(result.recordset)
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            })
    }

    private connect(): Promise<ConnectionPool> {
        const pool = new ConnectionPool(sqlConnectionString);
        return pool.connect()
            .then(() => {
                return pool;
            })
            .catch(error => {
                throw new Error(`Failed To connect To DB ${error}`);
            });
    }

    private convertRecordSetResultToProjection<T>(resultSet: IRecordSet<any>): T[] | T {
        const projections: T[] = [];

        resultSet.forEach(result => {
            projections.push(this.convertToProjection(result));
        });

        if (projections.length == 1) {
            return projections[0];
        }

        return projections;
    }

    private convertToProjection<T>(object: any): T {
        const newObject: T = new object;

        Object.keys(object).forEach(key => {
            const lowerCasedFirstLetterKey = key.charAt(0).toLocaleLowerCase() + key.slice(1);
            object[lowerCasedFirstLetterKey] = object[key];
        });

        return newObject;
    }
}
