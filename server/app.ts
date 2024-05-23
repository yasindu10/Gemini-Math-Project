import dotenv from 'dotenv'
dotenv.config()

import express, { Express } from 'express'
const app: Express = express()

import multer from 'multer'

import { getResult } from './controllers/ai-controller'

const upload = multer({ storage: multer.memoryStorage() })

app.use(express.json())

app.get('/api/v1/ai/', upload.single('image'), getResult)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`server is listening to port `);
})