import * as restify from "restify";
import * as mongoose from 'mongoose';
import {environment} from "../common/environment";
import {Router} from "../common/router";


export default class Server {
    application: restify.Server

    async inititializeDB(){
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          });
    }
    // inititializeDB(){
    //     (<any>mongoose).Promise = global.Promise
    //     return mongoose.connect(enviroment.db.url)
    // }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject)=>{
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
                routers.forEach((router)=>{
                    router.applyRoutes(this.application);
                });

                //Escutando servidor
                this.application.listen(environment.server.port, ()=> {
                    console.log("%s listening at %s", this.application.name, this.application.url);
                    resolve(this.application);
                });
                // Erros
                // this.application.on("error", (error)=> error);
            }
            catch(error) {
                reject(error);
            }
        });
    }
    
    bootstrap(routers: Router[] = []):  Promise<Server>{
        // return this.initRoutes(routers).then(()=>this);
        return this.inititializeDB().then(()=>this.initRoutes(routers).then(()=>this));
    }
}


