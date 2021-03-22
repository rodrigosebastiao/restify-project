/* const users = [
    {id: "1", name: "Peter Parker", email: "peter@marvel.com"},
    {id: "2", name: "Bruce Wayne", email: "bruce@dc.com"}
]

export class User {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users);
    }

    static findById(id: string): Promise<any>{
        // Recebe a query string via req.params.id e compara
        return new Promise(resolve=>{
            const filtered = users.filter(user=> user.id === id);
            let user = undefined;

            if(filtered.length > 0){
                user = filtered[0];
            }
            resolve(user);
        });
    }
} */

import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
    name: String,
    email: String,
    password: String
};

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: true
    }
});

// Tratativas de esquema para user
export const User = mongoose.model<User>("User", userSchema);