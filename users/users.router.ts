import * as restify from "restify";
import { Router } from "../common/router";
import { User } from "./users.model";

class UsersRouter extends Router {
  applyRoutes(application: restify.Server) {
    //Verifica  de forma asíncrona se recurso existe
    application.get("/users", (req, res, next) => {
        User.find().then((users) => {
            res.json(users);
            return next();
        });
    });
    
    //Ao completar o next() anterior, faz-se a busca do id da queryString
    application.get("/users/:id", (req, res, next) => {
      User.findById(req.params.id).then(user=>{
        if(user){
            res.json(user);
            return next();
        }
        res.send(404);
        return next(false);
      });
    });

    application.post("/users", (req, res, next)=>{
      let user = new User(req.body);
      user.password = undefined;

      user.save().then((user)=>{
        res.json(user);
        return next();
      });
    });

    application.put("/users/:id", (req, res, next)=>{
      // Opções que permitem sobrescrever
      const options = {overwrite: true};
      User.update({_id: req.params.id}, req.body, options)
        .exec()
        .then(result=>{
          if(result.n){
            return User.findById(req.params.id);
          }
        })
        .then(user => {
          res.json(user);
          return next();
        });
    });
  }
}

export const usersRouter = new UsersRouter();
