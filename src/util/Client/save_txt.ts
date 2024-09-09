import fs from 'fs';
import colors from 'colors';
import build from '../../main';
import { JsonDatabase } from "wio.db";
const db = new JsonDatabase({
    databasePath:"./src/myJsonData.json"
  });
  
//import base from '../../data.json'
export default async function save_txt(name: string, pr: string, titulo: boolean, nome: string, notString: boolean): Promise<any> {

 colors.setTheme({ 
 success: 'green',
 caution: 'yellow',
 error: 'red',
 text: 'bgWhite'
 })
 const text: string = pr // Junta as strings do array com quebra de linha
 let revised: string = '';
 let nome2: any = name;
 if (titulo === true) revised = `${nome}\nRevised by: ProofReader AI\nCreated by: Kgzin\n\n ${text}`
 if (titulo === false) revised = `Revised by: ProofReader AI\nCreated by: Kgzin\n\n ${text}`
 if (notString === true) nome2 = db.get("nome");

 fs.writeFile(`./src/saves/${nome2} - Revised.txt`, revised, () => {
 console.clear()
 console.log(`[!]`.green + ` O manga/manhwa ` + nome2 + ` foi revisado com sucesso, em 10 segundos retornarei a pagina inicial`.white + `\n[!]`.red + ` É importante lembrar que a revisão por IA não substitui a revisão humana. A IA pode auxiliar na identificação de erros e na sugestões de frases, \nmas a revisão final deve ser feita por um revisor humano.`);
 setTimeout(() => {
 console.clear()
 build()
 }, 70000)
 });
return { created: true };
}