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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAiData = void 0;
const generative_ai_1 = require("@google/generative-ai");
const API_KEY = process.env.API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY ? API_KEY : '');
const getAiData = (buffers) => __awaiter(void 0, void 0, void 0, function* () {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "solve this math problem and show the answers and steps";
    const image = {
        inlineData: {
            data: buffers.toString('base64'),
            mimeType: "image/png",
        },
    };
    const result = yield model.generateContent([prompt, image]);
    return result.response.text();
});
exports.getAiData = getAiData;
