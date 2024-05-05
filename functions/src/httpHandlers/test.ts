import * as logger from 'firebase-functions/logger';
import type { Request, Response } from 'firebase-functions/v1';

export const handler = async (req: Request, res: Response): Promise<void> => {
  const { status: reqStatus = '200' } = req.query;
  const status = Number(reqStatus);

  logger.info('Hello logs!', { structuredData: true });
  res.status(status).json({ message: 'Hello Firebase Function' });
};
