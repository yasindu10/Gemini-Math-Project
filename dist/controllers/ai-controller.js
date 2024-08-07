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
exports.getResult = void 0;
const gemini_integration_1 = require("../utils/gemini-integration");
const getResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.file, req.body);
    const buffers = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer; // get buffers from file
    if (!buffers)
        return;
    const result = yield (0, gemini_integration_1.getAiData)(buffers);
    res.status(200).json({ success: true, data: result });
});
exports.getResult = getResult;
