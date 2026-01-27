/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-27
 ------------------------------------------------- */

import compression from 'compression';
import cookieParser from 'cookie-parser';
import type { Express, Response, Request } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const createApp = (): Express => {
  const app = express();

  // HTTP request logger middleware
  app.use(morgan('dev'));
  // Secure Express apps by setting HTTP response headers
  app.use(helmet());
  // Parse Cookie header and populate req.cookies
  app.use(cookieParser());
  // Enable gzip compression
  app.use(compression());
  // Middleware to parse URL-encoded request bodies
  app.use(express.urlencoded({ extended: true }));
  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Routes
  app.get('/', (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
      date: new Date,
    })
  })

  // Handle error

  return app;
}
