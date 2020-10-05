import { Database } from "../core/database/database";
import { Store } from "./store";
import { StoreProjection } from "./storeProjection";

export class StoreRepository {
    constructor(private database = new Database()) { }

    public async list(): Promise<Store[]> {
        const projectionPromise = this.database.executeStoredProcedureWithResults<StoreProjection>('stores.usp_ListStores', {});
        return projectionPromise
            .then(projections => {
                return projections.map(projection => Store.FromProjection(projection));
            })
            .catch(error => {
                throw error(error);
            });
    }
}