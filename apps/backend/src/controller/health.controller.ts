import { Request, Response } from 'express';

/**
 * @returns the health check
 */
export const healthCheck = async (req: Request, res: Response) =>
  res.status(200).json({ status: 'up' });
