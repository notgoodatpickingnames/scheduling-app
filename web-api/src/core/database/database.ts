
import { sqlConnectionString } from "../../../environment";
import { ConnectionPool, IRecordSet } from "mssql/msnodesqlv8";
import { SqlRequestFactory } from "./sqlRequestFactory";

export class Database {
    constructor() {}

    public async executeStoredProcedureWithResult<T>(storedProcedureName: string, params: object): Promise<T> {
        try {
            const connectionPool = await this.connect();
            const request = SqlRequestFactory.Create(connectionPool, params);
            const requestResult = await request.execute<T>(storedProcedureName);
            const projection = this.convertRecordSetResultToProjection<T>(requestResult.recordset);

            return projection;
        } catch(error) {
            throw new Error(`Failed To Execute Stored Procedure ${error}`);
        }
    }

    public async executeStoredProcedureWithResults<T>(storedProcedureName: string, params: object): Promise<T[]> {
        try {
            const connectionPool = await this.connect();
            const request = SqlRequestFactory.Create(connectionPool, params);
            const requestResult = await request.execute<T>(storedProcedureName);
            const projections = this.convertRecordSetResultsToProjections<T>(requestResult.recordset);

            return projections;
        } catch (error) {
            throw new Error(`Failed To Execute Stored Procedure: ${error}`);
        }

    }

    public async executeStoredProcedure(storedProcedureName: string, params: object): Promise<void> {
        try {
            const connectionPool = await this.connect();
            const request = SqlRequestFactory.Create(connectionPool, params);
            await request.execute(storedProcedureName);
        } catch (error) {
            throw new Error(`Failed To Execute Stored Procedure: ${error}`);
        }

    }

    private async connect(): Promise<ConnectionPool> {
        const pool = new ConnectionPool(sqlConnectionString);
        try {
            await pool.connect();
            return pool;
        } catch (error) {
            throw new Error(`Failed To connect To DB ${error}`);
        }
    }

    private convertRecordSetResultToProjection<T>(resultSet: IRecordSet<any>): T {
        if (resultSet.length === 1) {
            return this.convertToProjection(resultSet[0]);
        }

        if (resultSet.length > 1) {
            throw new Error('Too many results returned');
        }

        return undefined;
    }

    private convertRecordSetResultsToProjections<T>(resultSet: IRecordSet<any>): T[] {
        const projections: T[] = [];

        resultSet.forEach(result => {
            projections.push(this.convertToProjection(result));
        });

        return projections;
    }

    private convertToProjection<T>(object: any): T {
        const newObject: any = {};

        Object.keys(object).forEach(key => {
            const lowerCasedFirstLetterKey = key.charAt(0).toLocaleLowerCase() + key.slice(1);
            newObject[lowerCasedFirstLetterKey] = object[key];
        });

        return newObject as T;
    }
}
