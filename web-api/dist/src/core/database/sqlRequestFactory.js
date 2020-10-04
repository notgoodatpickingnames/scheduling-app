"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRequestFactory = void 0;
class SqlRequestFactory {
    // public static CreateWithOutput<T>(pool: ConnectionPool, inputObject: object, outputObject: T): Request {
    //     console.log(`pool: ${pool}`);
    //     const request = pool.request();
    // this.convertObjectToInputParams(request, inputObject);
    // this.convertTypeToOutputParams(request, typeof(outputObject));
    //     return request;
    // }
    static Create(pool, inputObject) {
        const request = pool.request();
        this.convertObjectToInputParams(request, inputObject);
        return request;
    }
    static convertObjectToInputParams(request, inputObject) {
        Object.keys(inputObject).forEach(key => {
            console.log(`converting key ${key}`);
            request.input(key, inputObject[key]);
        });
    }
}
exports.SqlRequestFactory = SqlRequestFactory;
//# sourceMappingURL=sqlRequestFactory.js.map