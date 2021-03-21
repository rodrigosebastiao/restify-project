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
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
class Server {
    inititializeDB() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose.Promise = global.Promise;
            return mongoose.connect(environment_1.environment.db.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
        });
    }
    // inititializeDB(){
    //     (<any>mongoose).Promise = global.Promise
    //     return mongoose.connect(enviroment.db.url)
    // }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                //Criando servidor
                this.application = restify.createServer({
                    name: "myapp",
                    version: "1.0.0"
                });
                //Plugin de queries digitadas
                this.application = this.application.use(restify.plugins.queryParser());
                //Plugin de conversão para req.body
                this.application = this.application.use(restify.plugins.bodyParser());
                //Rotas
                routers.forEach((router) => {
                    router.applyRoutes(this.application);
                });
                //Escutando servidor
                this.application.listen(environment_1.environment.server.port, () => {
                    console.log("%s listening at %s", this.application.name, this.application.url);
                    resolve(this.application);
                });
                // Erros
                // this.application.on("error", (error)=> error);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        // return this.initRoutes(routers).then(()=>this);
        return this.inititializeDB().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.default = Server;