"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = build;
//import base from './build/builder.ts';
require("dotenv/config");
const readline = __importStar(require("readline"));
const main_1 = __importDefault(require("./util/proofreader/main"));
const fs_1 = __importDefault(require("fs"));
const save_txt_1 = __importDefault(require("./util/Client/save_txt"));
const wio_db_1 = require("wio.db");
const db = new wio_db_1.JsonDatabase({
    databasePath: "./src/myJsonData.json"
});
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function build() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const txt = `
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
`;
        const aviso = `[!] A opção "translator" ainda está em desenvolvimento! Não sendo possivel utiliza-la no momento.`;
        const options = `
[1] ProofReader
[2] Translator
[3] Salvar tradução
`;
        console.log(`${txt}`.magenta + `${aviso}`.red + `\n${options}`.yellow);
        rl.question(`[!] `.blue + `Opção: `, (opt) => __awaiter(this, void 0, void 0, function* () {
            if (opt === '1') {
                rl.question(`[!] `.yellow + 'Nome da obra e capitulo(Nome (Cap)): ', (nome) => __awaiter(this, void 0, void 0, function* () {
                    //console.log(nome.length)
                    rl.question(`[!] `.yellow + 'Titulo (Responda com Sim ou Não(S or N)): ', (sorn) => __awaiter(this, void 0, void 0, function* () {
                        let title;
                        const proofOnePromise = new Promise((resolve, reject) => {
                            fs_1.default.readFile('./translation/parte 1.txt', 'utf-8', (err, proof) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    title = proof.split('\n');
                                    resolve(proof);
                                }
                            });
                        });
                        const proofTwoPromise = new Promise((resolve, reject) => {
                            fs_1.default.readFile('./translation/parte 2.txt', 'utf-8', (err, proof) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(proof);
                                }
                            });
                        });
                        const proofThreePromise = new Promise((resolve, reject) => {
                            fs_1.default.readFile('./translation/parte 3.txt', 'utf-8', (err, proof) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(proof);
                                }
                            });
                        });
                        const proofFourPromise = new Promise((resolve, reject) => {
                            fs_1.default.readFile('./translation/parte 4.txt', 'utf-8', (err, proof) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(proof);
                                }
                            });
                        });
                        try {
                            console.clear();
                            let squares = '';
                            const loadingChars = ['▏', '▎', '▍', '▌', '▋', '▊', '▉'];
                            const points = ['    ', '.   ', '..  ', '... '];
                            let i = 0;
                            let j = 0;
                            //console.log(`[!] `.blue + 'Revisando')
                            const intervalId = setInterval(() => {
                                console.clear(); //Pra deixar do jeito que eu queria :) Gambiarra funcional kkkkkkkk
                                process.stdout.write(`\r[!] `.blue + 'Revisando' + `${points[j++ % points.length]}` + `
    ${squares + loadingChars[i++ % loadingChars.length]}`.green);
                                if (loadingChars[i % loadingChars.length] === "▏")
                                    squares = squares + `▉`;
                                if (i >= 85 * 2) {
                                    clearInterval(intervalId);
                                    console.clear();
                                    console.log(`[!]`.green + ' Carregamento concluído!');
                                }
                            }, 1000);
                            //Gambiarra da desgraça, (Temporario)
                            const proofone = yield proofOnePromise;
                            const prooftwo = yield proofTwoPromise;
                            const proofthree = yield proofThreePromise;
                            const prooffour = yield proofFourPromise;
                            let revisaodois, revisaothree, revisaofour, proofed;
                            //console.log(proof);
                            const revisaoum = yield (0, main_1.default)(proofone);
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () { revisaodois = yield (0, main_1.default)(prooftwo); }), 20000);
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () { revisaothree = yield (0, main_1.default)(proofthree); }), 40000);
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () { revisaofour = yield (0, main_1.default)(prooffour); }), 60000);
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                proofed = revisaoum[0].content.parts[0].text + revisaodois[0].content.parts[0].text + revisaothree[0].content.parts[0].text + revisaofour[0].content.parts[0].text;
                                let titulo = true;
                                let created;
                                if (sorn === 'não' || sorn === 'n' || sorn === 'not' || sorn === 'nao' || sorn === 'Nao')
                                    titulo = false;
                                console.log(title[0]);
                                if (nome.length <= 1) {
                                    const nome2 = title[0].toString();
                                    const dataJson = {
                                        "nome": title[0]
                                    };
                                    db.set('nome', title[0].toString().replace("\r", ""));
                                    created = yield (0, save_txt_1.default)(nome2, proofed, titulo, title[0], true);
                                }
                                else {
                                    created = yield (0, save_txt_1.default)(nome, proofed, titulo, nome, false);
                                    console.log("nome");
                                }
                                if (created.created === true) {
                                    // console.log(nome2.length, name)
                                    clearInterval(intervalId);
                                    //clearInterval(pointId)
                                }
                            }), 80000);
                            //console.log(proofed, revisaoum.candidates)
                        }
                        catch (err) {
                            console.error('Erro ao ler o arquivo:', err);
                        }
                    }));
                }));
            }
            else if (opt === '2') {
                console.clear();
                console.log(`[!] `.red + `Essa opção ainda está em desenvolvimento!`);
                setTimeout(() => {
                    build();
                }, 5000);
            }
            else if (opt === '3') {
                console.clear();
                let i = 0;
                let divisionInterval = setInterval(() => {
                    const points = ['.   ', '..  ', '... '];
                    console.clear(); //Pra deixar do jeito que eu queria :) Gambiarra funcional kkkkkkkk
                    process.stdout.write(`\r[!] `.blue + 'Dividindo' + `${points[i++ % points.length]}`);
                }, 700);
                setTimeout(() => {
                    clearInterval(divisionInterval);
                    console.clear();
                    console.log("[!] ".green + `Partes salvas com sucesso!.`);
                    setTimeout(() => {
                        console.clear();
                        build();
                    }, 5000);
                }, 2400);
                const translationPromise = new Promise((resolve, reject) => {
                    fs_1.default.readFile('./src/translation.txt', 'utf-8', (err, proof) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(proof);
                        }
                    });
                });
                const translationAwaitPromise = yield translationPromise;
                const translation = translationAwaitPromise.split('\n');
                const division = Math.ceil(translation.length / 4);
                const parts = [
                    translation.slice(0, division),
                    translation.slice(division, division * 2),
                    translation.slice(division * 2, division * 3),
                    translation.slice(division * 3)
                ];
                parts.forEach((part, index) => {
                    fs_1.default.writeFile(`./translation/parte ${index + 1}.txt`, part.join('\n'), (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                        }
                        else {
                            //console.log("[!] ".green + `Parte ${index + 1} saved successfully.`);
                        }
                    });
                });
            }
            else {
                console.clear();
                build();
            }
        }));
    });
}
build();
//const token: any = process.env.token;
//const build = new base().login(token.toString())
