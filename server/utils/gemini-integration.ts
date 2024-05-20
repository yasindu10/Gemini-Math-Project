import {
    GoogleGenerativeAI,
} from "@google/generative-ai";
import axios from 'axios'

const API_KEY: string | undefined = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY ? API_KEY : '');

const fetchImageAsBase64 = async (url: string): Promise<string> => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary').toString('base64');
    } catch (error) {
        console.error('Error fetching the image:', error);
        throw error;
    }
}

const getAiData = async (url: string): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "what is this image include";
    const imageBase64 = await fetchImageAsBase64(url)

    const image = {
        inlineData: {
            data: imageBase64,
            mimeType: "image/png",
        },
    };

    const result = await model.generateContent([prompt, image]);
    return result.response.text()
}

export { getAiData }