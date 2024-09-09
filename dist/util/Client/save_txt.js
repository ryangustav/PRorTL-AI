"use strict";
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
exports.default = save_txt;
const fs_1 = __importDefault(require("fs"));
const colors_1 = __importDefault(require("colors"));
const main_1 = __importDefault(require("../../main"));
const wio_db_1 = require("wio.db");
const db = new wio_db_1.JsonDatabase({
    databasePath: "./src/myJsonData.json"
});
//import base from '../../data.json'
function save_txt(name, pr, titulo, nome, notString) {
    return __awaiter(this, void 0, void 0, function* () {
        colors_1.default.setTheme({
            success: 'green',
            caution: 'yellow',
            error: 'red',
            text: 'bgWhite'
        });
        const text = pr; // Junta as strings do array com quebra de linha
        let revised = '';
        let nome2 = name;
        if (titulo === true)
            revised = `${nome}\nRevised by: ProofReader AI\nCreated by: Kgzin\n\n ${text}`;
        if (titulo === false)
            revised = `Revised by: ProofReader AI\nCreated by: Kgzin\n\n ${text}`;
        if (notString === true)
            nome2 = db.get("nome");
        fs_1.default.writeFile(`./src/saves/${nome2} - Revised.txt`, revised, () => {
            console.clear();
            console.log(`[!]`.green + ` O manga/manhwa ` + nome2 + ` foi revisado com sucesso, em 10 segundos retornarei a pagina inicial`.white + `\n[!]`.red + ` É importante lembrar que a revisão por IA não substitui a revisão humana. A IA pode auxiliar na identificação de erros e na sugestões de frases, \nmas a revisão final deve ser feita por um revisor humano.`);
            setTimeout(() => {
                console.clear();
                (0, main_1.default)();
            }, 70000);
        });
        return { created: true };
    });
}
