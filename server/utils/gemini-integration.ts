import {
    GoogleGenerativeAI,
} from "@google/generative-ai";
import axios from 'axios'

const API_KEY: string | undefined = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY ? API_KEY : '');

const fetchImageAsBase64 = async (url: string): Promise<string> => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const data = Buffer.from(response.data, 'binary').toString('base64');
        console.log(data);
        return data
    } catch (error) {
        console.error('Error fetching the image:', error);
        throw error;
    }
}

const getAiData = async (url: string): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "what is this image include";
    const imageBase64 = await fetchImageAsBase64('https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630')

    const image = {
        inlineData: {
            data: imageBase64,
            mimeType: "image/png",
        },
    };

    // const result = await model.generateContent([prompt, image]);
    // return result.response.text()
    return ''
}

export { getAiData }