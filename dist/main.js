"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const server = new server_1.default();
server.bootstrap([users_router_1.usersRouter]).then(server => {
    console.log("Escutando", server.application.address());
}).catch(error => {
    console.log("Server failt to start");
    console.log("Error", error);
    process.exit(1);
});
