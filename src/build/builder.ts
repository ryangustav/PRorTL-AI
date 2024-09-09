import { client } from '../util/Client/client';

export default class base {
    login(token: string) {
    new client().login(token)
    }
}