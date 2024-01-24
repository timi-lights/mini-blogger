import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const code: number = error.code || 500;
    const status = 'failed';
    const message: string = error.message || 'Something went wrong';
    const errors: {} = error.errors || {};

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${code}, Message:: ${message}`);
    res.status(code).json({ status, message, errors });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
