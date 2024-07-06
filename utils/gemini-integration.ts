import {
    GoogleGenerativeAI,
} from "@google/generative-ai";

const API_KEY: string | undefined = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY ? API_KEY : '');

const getAiData = async (buffers: Buffer): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "solve this math problem and show the answers and steps";

    const image = {
        inlineData: {
            data: buffers.toString('base64'),
            mimeType: "image/png",
        },
    };

    const result = await model.generateContent([prompt, image]);
    return result.response.text()
}

export { getAiData }