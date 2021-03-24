import * as restify from "restify";

const mpContentType = "application/merge-patch+json";

export const mergePatchBodyParser = (req:restify.Request, res: restify.Response, next)=>{

    if(req.getContentType() === mpContentType && req.method === "PATCh"){
        try{
            req.body = JSON.parse(req.body);
        }
        catch(error){
            return next(new Error(`invalid content: ${error.message}`));
        }
    }
    return next();
};