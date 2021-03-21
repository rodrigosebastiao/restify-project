import * as restify from "restify";


export abstract class Router {

    abstract applyRoutes(application: restify.Server);
    /*this.application.get("/hello", [
                    (req, res, next)=>{
                        
                        if(req.userAgent().includes("MSIE 7.0;")){
                            console.log("Não atendemos esse browser!!!");
                            res.json({message: "Não atendemos esse browser"});
                            let error: any = new Error();
                            return next(error);
                        }
                        return next();
                    }, (req, res, next)=>{
                    // res.json({message: "Agora sim, ninguém me para!"});
                    res.json({
                        // broswer info
                        browser: req.userAgent(),
                        // method, GET,POST, etc
                        method: req.method,
                        // address
                        url: req.href(),
                        path: req.path(),
                        query: req.query
                    });
                    return next();
                }]); */
}