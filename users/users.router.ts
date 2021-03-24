import * as restify from "restify";
import { Router } from "../common/router";
import { User } from "./users.model";

class UsersRouter extends Router {
  applyRoutes(application: restify.Server) {
    //Verifica  de forma asíncrona se recurso existe
    application.get("/users", (req, res, next) => {
        // find all e retorna [] array vazio se 0
        User.find().then((users) => {
            res.json(users);
            return next();
        });
    });
    
    //Ao completar o next() anterior, faz-se a busca do id da queryString
    application.get("/users/:id", (req, res, next) => {
      // busca o id pelo parâmetro (com restify-plugin-queryParser)
      User.findById(req.params.id).then(user=>{
        // Ou encontra o usuário
        if(user){
            res.json(user);
            return next();
        }
        // Ou não encontra
        res.send(404);
        return next(false);
      });
    });

    application.post("/users", (req, res, next)=>{
      // cria um novo ducumento, com os parâmetros (com restify-plugin-bodyParser)
      let user = new User(req.body);
      user.password = undefined;
      // necessário usar o .save
      user.save().then((user)=>{
        res.json(user);
        return next();
      });
    });

    application.put("/users/:id", (req, res, next)=>{
      // Opções que permitem sobrescrever
      // Econtra o id e atualiza cada opção com req.body
      User.updateOne({_id: req.params.id}, req.body)
        //Retorna um objeto de query, então precisa do exec, para excução do comando
        .exec()
        .then(result=>{
          // .n representa o némro de linhas afetados
          if(result.n){
            // se existe ao menos uma linha = sucesso
            return User.findById(req.params.id);
          } else {
            res.send(404);
          }
        })
        .then(user => {
          // por fim retorna os valores afetados
          res.json(user);
          return next();
        });
    });

    application.patch("/users/:id", (req, res, next)=>{
      // options: new: false retorna o documento original; new: true retorna o modificado
      const options = {new: true};
      // encontra por Id e atualiza
      User.findByIdAndUpdate(req.params.id, req.body, options)
      // Async
        .then(user=>{
          if(user){
             res.json(user);
             return next();
          }
          res.send(404);
          return next();
        });
    });

    application.del("/users/:id", (req, res, next) => {
      User.deleteOne({_id: req.params.id})
        .exec()
        .then((cmdResult: any)=>{
          if(cmdResult.n){
            res.send(204);
            return next();
          }
          res.send(404);
          return next();          
        });
    });
  }
}

export const usersRouter = new UsersRouter();
