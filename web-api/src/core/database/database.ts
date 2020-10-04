
import { sqlConnectionString } from "../../../environment";
import { ConnectionPool, Int, NVarChar, VarChar } from "mssql/msnodesqlv8";
// import { dbConfig } from "../../environment";

export class Database {
    public run = async () => {
        this.executeStoredProcedure("stores.usp_InsertStore", {});
    }

    public executeStoredProcedure<t>(storedProcedureName: string, params: object): Promise<t> {
        return this.connect()
            .then(pool => {
                return pool.request()
                    .input('name', NVarChar, 'STORE NAME TEST')
                    .input('description', NVarChar, 'store description test')
                    .execute(storedProcedureName)
                    .then(result => console.log(result))
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
                return null;
            })
    }

    private connect(): Promise<ConnectionPool> {
        const pool = new ConnectionPool(sqlConnectionString);
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
