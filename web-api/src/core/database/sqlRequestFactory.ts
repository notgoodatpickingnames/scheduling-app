import { Bit, ConnectionPool, ISqlTypeFactory, ISqlTypeFactoryWithNoParams, Numeric, Request } from "mssql";

import { Int, NVarChar, DateTime, Decimal, UniqueIdentifier,   } from "mssql/msnodesqlv8";

export class SqlRequestFactory {
public static Create(pool: ConnectionPool, inputObject: object): Request {
        const request = pool.request();

        this.convertObjectToInputParams(request, inputObject);

        return request;
    }

    private static convertObjectToInputParams(request: Request, inputObject: any): void {
        Object.keys(inputObject).forEach(key => {
            request.input(key, inputObject[key]);
        });
    }
}