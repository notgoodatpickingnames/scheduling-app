import { Request, Response } from "express";

export async function isAuthenticated(req: Request, res: Response, next: () => any) {
    const { authorization } = req.headers

    if (!authorization) {
        console.log('no auth sending 401');
        return res.status(401).send({ message: 'Unauthorized (like no auth at all) ((also dooly is a gey))' });
    }

    if (!authorization.startsWith('Bearer')) {
        console.log('auth has no bearer sending 401.');
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const split = authorization.split('Bearer ')
    if (split.length !== 2) {
        console.log('sending 401 because bearer token is incorrect.');
        return res.status(401).send({ message: 'Unauthorized' });
    }

   const token = split[1]

   try {
    //    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
    //    console.log("decodedToken", JSON.stringify(decodedToken))
    //    res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
       return next();
   }
   catch (err) {
       console.error(`${err.code} -  ${err.message}`)
       return res.status(401).send({ message: 'Unauthorized' });
   }
}