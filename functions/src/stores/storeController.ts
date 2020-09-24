import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import { IListRequest } from "./IListRequest";
// import { analytics } from "firebase-functions";
// import { DataSnapshot } from "firebase-functions/lib/providers/database";

export async function list(req: Request, res: Response) {
    try {
        const listRequest = req.body as IListRequest;

        const promises: Promise<any>[] = [];

        listRequest.relatedStoreIds.forEach(relatedStoreId => {
            promises.push(getSnapshot(relatedStoreId));
        })

        return Promise.all(promises)
            .then(stores => res.status(200).send(stores))
            .catch(error => {
                console.log(error);
                res.status(500).send({message: 'Something Went Horribly Wrong'});
            })

    } catch (err) {
        return handleError(res, err)
    }
}

function getSnapshot(relatedStoreId: string): Promise<any> {
    return admin.database().ref(`stores/${relatedStoreId}/`).once('value')
        .then(snapshot => {
            return({storeId: relatedStoreId, store: snapshot.val()});
        })
        .catch(error => console.log(error));
}

 function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }