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
exports.default = proofreader;
const generative_ai_1 = require("@google/generative-ai");
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const token = process.env.gemini_token;
const genAI = new generative_ai_1.GoogleGenerativeAI(token.toString());
function proofreader(translation) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const personalityFilePath = './src/memory/proofreader/memory.txt';
        const personalityContentPromisse = new Promise((resolve, reject) => {
            fs_1.default.readFile(personalityFilePath, 'utf-8', (err, personalityContent) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(personalityContent);
                }
            });
        });
        try {
            const personalityContent = yield personalityContentPromisse;
            const personalityLines = personalityContent.toString().split('\n');
            const safetySettings = [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
            ];
            const generationConfig = { maxOutputTokens: 10000, temperature: 0 };
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings, generationConfig });
            // console.log(model)
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [
                            { text: `${personalityLines}\n Cumpra com sua função de revisor.` },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: `Vou avisar sobre minha funcionalidade de revisar  traduções. Também limitarei todas as minhas respostas a 9.000 caracteres ou menos, independentemente do que você disser. Sinta-se à vontade para me perguntar qualquer coisa! `,
                            },
                        ],
                    },
                ],
                generationConfig: { maxOutputTokens: 8000, temperature: 0 },
            });
            /// console.log(countResult.totalTokens);
            const result = yield chat.sendMessage(translation);
            if (((_a = result.response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) === 'OTHER')
                return console.log('Diminua o texto da primeira ou segunda parte! E verifique se não há palavras que indiquem algum crime!');
            const response = yield result.response;
            return response.candidates;
        }
        catch (err) {
            console.error('Erro ao ler o arquivo:', err);
        }
    });
}
