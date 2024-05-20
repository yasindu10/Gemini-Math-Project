import { Request, Response } from 'express'

import { getAiData } from '../utils/gemini-integration'
import { memoryStorage } from 'multer'


const getResult = async (req: Request, res: Response): Promise<void> => {
    const url = req.body.url
    const result = await getAiData(url)
    res.status(200).json({ success: true, data: result })
}

export { getResult }