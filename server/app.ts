import dotenv from 'dotenv'
dotenv.config()

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

const run = async (): Promise<void> => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "what is this image include";
    const imageBase64 = await fetchImageAsBase64('https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D')

    const image = {
        inlineData: {
            data: imageBase64,
            mimeType: "image/png",
        },
    };

    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());
}

run();