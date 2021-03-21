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
      user.save().then((val)=>console.log("val", val));
      // user.save().then(user=>{
      //   user.password = undefined;
      //   res.json(user);
      //   return next();
      // });
    });

  }
}

export const usersRouter = new UsersRouter();
