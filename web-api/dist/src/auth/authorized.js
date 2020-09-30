"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
function isAuthorized(opts) {
    return (req, res, next) => {
        const { role, uid } = res.locals;
        const { id } = req.params;
        if (opts.allowSameUser && id && uid === id)
            return next();
        if (!role)
            return res.status(403).send();
        if (opts.hasRole.includes(role))
            return next();
        return res.status(403).send();
    };
}
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=authorized.js.map