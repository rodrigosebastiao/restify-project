import * as restify from "restify";
import * as mongoose from 'mongoose';
import {environment} from "../common/environment";
import {Router} from "../common/router";
import { mergePatchBodyParser } from './merge-patch-parser';

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

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject)=>{
            try {
                //Criando servidor
                this.application = restify.createServer({
                    name: "myapp",
                    version: "1.0.0"
                });

                //Plugin de queries da URL
                this.application = this.application.use(restify.plugins.queryParser());
                
                //Plugin de conversão do req.body para json
                this.application = this.application.use(restify.plugins.bodyParser());

                // Config especial para match-patch+json
                this.application = this.application.use(mergePatchBodyParser);

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
        return this.inititializeDB().then(()=>this.initRoutes(routers).then(()=>this));
    }
}


