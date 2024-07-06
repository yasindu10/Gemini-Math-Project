import { Request, Response } from 'express'

import { getAiData } from '../utils/gemini-integration'

const getResult = async (req: Request, res: Response): Promise<void> => {
    const buffers = req.file?.buffer // get buffers from file
    if (!buffers) return
    const result = await getAiData(buffers)

    res.status(200).json({ success: true, data: result })
}

export { getResult }