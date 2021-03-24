"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePatchBodyParser = void 0;
const mpContentType = "application/merge-patch+json";
const mergePatchBodyParser = (req, res, next) => {
    if (req.getContentType() === mpContentType && req.method === "PATCh") {
        try {
            req.body = JSON.parse(req.body);
        }
        catch (error) {
            return next(new Error(`invalid content: ${error.message}`));
        }
    }
    return next();
};
exports.mergePatchBodyParser = mergePatchBodyParser;
