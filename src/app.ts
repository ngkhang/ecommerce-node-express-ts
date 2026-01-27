/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-27
 ------------------------------------------------- */

import type { Express, Response, Request } from 'express';
import express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';


export const createApp = (): Express => {
  const app = express();

  // Initial middleware
  app.use(express.urlencoded({ extended: true }));
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
