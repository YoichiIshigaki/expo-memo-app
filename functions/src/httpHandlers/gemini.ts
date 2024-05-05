import * as logger from 'firebase-functions/logger';
import type { Request, Response } from 'firebase-functions/v1';
import { run } from '../lib/gemini';

export const handler = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'POST' && !!req.body.text) {
    const { text } = req.body;
    const answer = await run(text);

    logger.info('Gemini logs!', { text });
    res.status(200).json({ message: answer });
    return;
  }
  res.status(400).json({ message: 'Error Gemini' });
};
