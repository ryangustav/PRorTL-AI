import { client } from '../util/Client/client';

//Projeto futuro ignore!!
export default class base {
    login(token: string) {
    new client().login(token)
    }
}