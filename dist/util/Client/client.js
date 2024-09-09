"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv/config");
//Projeto futuro ignore!!
class client {
    login(token) {
        if (token != process.env.token)
            throw new Error('Inválid token has been sended!');
        return { code: 200, message: `Login has been succesfully` };
    }
}
exports.client = client;
