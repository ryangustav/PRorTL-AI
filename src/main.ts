//import base from './build/builder.ts';
import 'dotenv/config';
import * as readline from 'readline';
import proofreader from './util/proofreader/main';
import fs from 'fs';
import save_txt from './util/Client/save_txt';
import { GoogleGenerativeAI } from '@google/generative-ai';
import colors from 'colors';
import { JsonDatabase } from "wio.db";
const db = new JsonDatabase({
  databasePath:"./src/myJsonData.json"
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default async function build() {
console.clear()
const txt: string = `
────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████──████████████████────██████████████──████████████████────██████████████──██████─────────
─██░░░░░░░░░░██──██░░░░░░░░░░░░██────██░░░░░░░░░░██──██░░░░░░░░░░░░██────██░░░░░░░░░░██──██░░██─────────
─██░░██████░░██──██░░████████░░██────██░░██████░░██──██░░████████░░██────██████░░██████──██░░██─────────
─██░░██──██░░██──██░░██────██░░██────██░░██──██░░██──██░░██────██░░██────────██░░██──────██░░██─────────
─██░░██████░░██──██░░████████░░██────██░░██──██░░██──██░░████████░░██────────██░░██──────██░░██─────────
─██░░░░░░░░░░██──██░░░░░░░░░░░░██────██░░██──██░░██──██░░░░░░░░░░░░██────────██░░██──────██░░██─────────
─██░░██████████──██░░██████░░████────██░░██──██░░██──██░░██████░░████────────██░░██──────██░░██─────────
─██░░██──────────██░░██──██░░██──────██░░██──██░░██──██░░██──██░░██──────────██░░██──────██░░██─────────
─██░░██──────────██░░██──██░░██████──██░░██████░░██──██░░██──██░░██████──────██░░██──────██░░██████████─
─██░░██──────────██░░██──██░░░░░░██──██░░░░░░░░░░██──██░░██──██░░░░░░██──────██░░██──────██░░░░░░░░░░██─
─██████──────────██████──██████████──██████████████──██████──██████████──────██████──────██████████████─
────────────────────────────────────────────────────────────────────────────────────────────────────────
Creator: @onlykgzin || AI -> ProofReader & Translator
`
const aviso: string = `[!] A opção "translator" ainda está em desenvolvimento! Não sendo possivel utiliza-la no momento.`
const options: string = `
[1] ProofReader
[2] Translator
[3] Salvar tradução
`
console.log(`${txt}`.magenta + `${aviso}`.red + `\n${options}`.yellow)


rl.question(`[!] `.blue + `Opção: `, async (opt) => {

if (opt === '1') {
rl.question(`[!] `.yellow + 'Nome da obra e capitulo(Nome (Cap)): ', async (nome: string) => {
  //console.log(nome.length)
  rl.question(`[!] `.yellow + 'Titulo (Responda com Sim ou Não(S or N)): ', async (sorn) => {
   
    let title: string[];

    const proofOnePromise = new Promise((resolve, reject) => {



        fs.readFile('./translation/parte 1.txt', 'utf-8', (err, proof) => {
          if (err) {
            reject(err);
          } else {
            title = proof.split('\n');
            resolve(proof);
          }
        });
      });

      
      const proofTwoPromise = new Promise((resolve, reject) => {
        fs.readFile('./translation/parte 2.txt', 'utf-8', (err, proof) => {
          if (err) {
            reject(err);
          } else {
            resolve(proof);
          }
        });
      });
      const proofThreePromise = new Promise((resolve, reject) => {
        fs.readFile('./translation/parte 3.txt', 'utf-8', (err, proof) => {
          if (err) {
            reject(err);
          } else {
            resolve(proof);
          }
        });
      });
    
      const proofFourPromise = new Promise((resolve, reject) => {
        fs.readFile('./translation/parte 4.txt', 'utf-8', (err, proof) => {
          if (err) {
            reject(err);
          } else {
            resolve(proof);
          }
        });
      });
    
      try {
        console.clear()
        let squares = ''
        const loadingChars = ['▏', '▎', '▍', '▌', '▋', '▊', '▉'];
        const points = ['    ', '.   ', '..  ', '... ']
        let i = 0;
        let j = 0;
        //console.log(`[!] `.blue + 'Revisando')
    const intervalId = setInterval(() => {
console.clear()  //Pra deixar do jeito que eu queria :) Gambiarra funcional kkkkkkkk
process.stdout.write(`\r[!] `.blue + 'Revisando' + `${points[j++ % points.length]}` + `
    ${squares + loadingChars[i++ % loadingChars.length]}`.green);
        if (loadingChars[i % loadingChars.length] === "▏") squares = squares + `▉`; 

        if (i >= 85 * 2) {
            clearInterval(intervalId);
            console.clear()
            console.log(`[!]`.green + ' Carregamento concluído!');
        }
    }, 1000);
  
//Gambiarra da desgraça, (Temporario)
        const proofone: any = await proofOnePromise;
        const prooftwo: any = await proofTwoPromise;
        const proofthree: any = await proofThreePromise;
        const prooffour: any = await proofFourPromise;
        let revisaodois: any, revisaothree: any, revisaofour: any, proofed: any;
        //console.log(proof);
        const revisaoum: any = await proofreader(proofone);
        setTimeout(async () => { revisaodois = await proofreader(prooftwo); }, 20000)
        setTimeout(async () => {  revisaothree = await proofreader(proofthree); }, 40000)
        setTimeout(async () => {  revisaofour = await proofreader(prooffour); }, 60000)
        setTimeout(async () => { 

proofed = revisaoum[0].content.parts[0].text + revisaodois[0].content.parts[0].text + revisaothree[0].content.parts[0].text + revisaofour[0].content.parts[0].text; 
          let titulo: boolean = true
          let created: any;
          if (sorn === 'não' || sorn === 'n' || sorn === 'not' || sorn === 'nao' || sorn === 'Nao') titulo = false;
          console.log(title[0])
          if (nome.length <= 1) {
            const nome2: string = title[0].toString();
            const dataJson: any = { 
              "nome": title[0]
            }
              db.set('nome', title[0].toString().replace("\r", ""))
              created = await save_txt(nome2, proofed, titulo, title[0], true)

  
          } else {
            created = await save_txt(nome, proofed, titulo, nome, false)
            console.log("nome")
          }
          if (created.created === true) {
           // console.log(nome2.length, name)

            clearInterval(intervalId);
            //clearInterval(pointId)
          }
        }, 80000)
        //console.log(proofed, revisaoum.candidates)
        
      } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
      }
    

   
})
})
} else if (opt === '2') {
  console.clear()
  console.log(`[!] `.red + `Essa opção ainda está em desenvolvimento!`)
  setTimeout(() => {
    build()
  }, 5000)
} else if (opt === '3') {
console.clear()
let i = 0; 
let divisionInterval = setInterval(() => {
 
  const points = ['.   ', '..  ', '... ']
  console.clear()  //Pra deixar do jeito que eu queria :) Gambiarra funcional kkkkkkkk
  process.stdout.write(`\r[!] `.blue + 'Dividindo' + `${points[i++ % points.length]}`);
}, 700)
setTimeout(() => { 
clearInterval(divisionInterval)
console.clear()
console.log("[!] ".green + `Partes salvas com sucesso!.`);
setTimeout(() => {
console.clear()
build()
}, 5000)
}, 2400)
const translationPromise = new Promise((resolve, reject) => {
  fs.readFile('./src/translation.txt', 'utf-8', (err, proof) => {
      if (err) {
          reject(err);
      } else {
          resolve(proof);
      }
  });
});





const translationAwaitPromise: any = await translationPromise;
const translation = translationAwaitPromise.split('\n');
const division = Math.ceil(translation.length / 4);

const parts = [
  translation.slice(0, division),
  translation.slice(division, division * 2),
  translation.slice(division * 2, division * 3),
  translation.slice(division * 3)
];

parts.forEach((part, index) => {
  fs.writeFile(`./translation/parte ${index + 1}.txt`, part.join('\n'), (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          //console.log("[!] ".green + `Parte ${index + 1} saved successfully.`);
      }
  });
});

} else {
 console.clear()
 build()
}
})
}
build()
//const token: any = process.env.token;

//const build = new base().login(token.toString())