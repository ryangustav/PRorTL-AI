"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../util/Client/client");
class base {
    login(token) {
        new client_1.client().login(token);
    }
}
exports.default = base;
