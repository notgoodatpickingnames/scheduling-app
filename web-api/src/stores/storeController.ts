import { Request, Response } from "express";
import { IListRequest } from "./IListRequest";
import { StoreRepository } from "./storeRepository";

export async function list(req: Request, res: Response) {
    const storeRepository = new StoreRepository();
    const stores = await storeRepository.list();

    res.status(200).send(stores);
}