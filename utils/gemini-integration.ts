import {
    GoogleGenerativeAI,
} from "@google/generative-ai";

const API_KEY: string | undefined = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY ? API_KEY : '');

const getAiData = async (buffers: Buffer): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = `fist check is this a math problem image. isn't a math problem send "This is not a math problem". is a math problem solve this math problem.is it solved check the answer for correctness and provide the solution step-by-step.`;

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
