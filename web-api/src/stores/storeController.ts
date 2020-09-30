import { Request, Response } from "express";
import { IListRequest } from "./IListRequest";

export async function list(req: Request, res: Response) {
    res.status(200).send({message: 'Correctly Connected'});
}