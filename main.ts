import Server from "./server/server";
import {usersRouter} from "./users/users.router";

const server = new Server();

server.bootstrap([usersRouter]).then(server=>{
    console.log("Escutando", server.application.address());
}).catch(error=>{
    console.log("Server failt to start");
    console.log("Error", error);
    process.exit(1);
});