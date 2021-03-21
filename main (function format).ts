import * as restify from "restify";
//Criando servidor
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

// server.use(restify.plugins.acceptParser(server.acceptable));
// server.use(restify.plugins.bodyParser());


server.use(restify.plugins.queryParser());

// Cria rotas + ações ou conteúdos
server.get("/hello", [
    (req, res, next)=>{
        
        if(req.userAgent().includes("MSIE 7.0;")){
            console.log("Não atendemos esse browser!!!");
            res.json({message: "Não atendemos esse browser"});
            let error: any = new Error();
            return next(false);
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
}]);

// Escutando o servidor
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});