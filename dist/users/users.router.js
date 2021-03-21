"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        //Verifica  de forma asíncrona se recurso existe
        application.get("/users", (req, res, next) => {
            users_model_1.User.find().then((users) => {
                res.json(users);
                return next();
            });
        });
        //Ao completar o next() anterior, faz-se a busca do id da queryString
        application.get("/users/:id", (req, res, next) => {
            users_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    res.json(user);
                    return next();
                }
                res.send(404);
                return next(false);
            });
        });
        application.post("/users", (req, res, next) => {
            let user = new users_model_1.User(req.body);
            user.save().then((val) => console.log("val", val));
            // user.save().then(user=>{
            //   user.password = undefined;
            //   res.json(user);
            //   return next();
            // });
        });
    }
}
exports.usersRouter = new UsersRouter();
