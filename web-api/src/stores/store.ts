import { StoreProjection } from "./storeProjection";

export class Store {
    public storeId: string;
    public name: string;
    public description: string;

    constructor(storeId: string, name: string, description: string) {
        this.storeId = storeId;
        this.name = name;
        this.description = description;
    }

    public static FromProjection(projection: StoreProjection): Store {
        return new Store(projection.storeId, projection.name, projection.description);
    }
}