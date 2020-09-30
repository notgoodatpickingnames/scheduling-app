"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            console.log('no auth sending 401');
            return res.status(401).send({ message: 'Unauthorized (like no auth at all)' });
        }
        if (!authorization.startsWith('Bearer')) {
            console.log('auth has no bearer sending 401');
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const split = authorization.split('Bearer ');
        if (split.length !== 2) {
            console.log('sending 401 because split is not 2??');
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const token = split[1];
        try {
            //    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
            //    console.log("decodedToken", JSON.stringify(decodedToken))
            //    res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
            return next();
        }
        catch (err) {
            console.error(`${err.code} -  ${err.message}`);
            return res.status(401).send({ message: 'Unauthorized' });
        }
    });
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authenticated.js.map