"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
class Store {
    constructor(storeId, name, description) {
        this.storeId = storeId;
        this.name = name;
        this.description = description;
    }
    static FromProjection(projection) {
        return new Store(projection.storeId, projection.name, projection.description);
    }
}
exports.Store = Store;
//# sourceMappingURL=store.js.map