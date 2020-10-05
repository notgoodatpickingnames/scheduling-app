"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRequestFactory = void 0;
class SqlRequestFactory {
    static Create(pool, inputObject) {
        const request = pool.request();
        this.convertObjectToInputParams(request, inputObject);
        return request;
    }
    static convertObjectToInputParams(request, inputObject) {
        Object.keys(inputObject).forEach(key => {
            request.input(key, inputObject[key]);
        });
    }
}
exports.SqlRequestFactory = SqlRequestFactory;
//# sourceMappingURL=sqlRequestFactory.js.map