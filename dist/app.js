"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const multer_1 = __importDefault(require("multer"));
const ai_controller_1 = require("./controllers/ai-controller");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
app.use(express_1.default.json());
app.get('/api/v1/ai/', upload.single('image'), ai_controller_1.getResult);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server is listening to port `);
});
