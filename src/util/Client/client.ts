import 'dotenv/config'
import base from '../../build/builder'

export class client {
 login(token: string) {
    if (token != process.env.token) throw new Error('Inválid token has been sended!')
     return { code: 200, message: `Login has been succesfully`}
 }
}