import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService){}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`Request: ${method} ${url} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)} | Status: ${statusCode}`, 'HTTP')
    })
    next();
  }
}
