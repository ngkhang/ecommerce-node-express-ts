/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-28
 ------------------------------------------------- */

import cors from 'cors';
import type { CorsOptions } from 'cors';
import { StatusCodes } from 'http-status-codes';
import { Env, NODE_ENVIRONMENT } from './env.config';

const allowedOrigins: string[] = Env.app.corsOrigins.split(',').map((o) => o.trim());

/**
 * CORS Configuration options
 * @see {@link https://github.com/expressjs/cors#configuration-options}
 */
const corsOptions: CorsOptions = {
  // Access-Control-Allow-Origin
  origin(requestOrigin, callback) {
    if (!requestOrigin) {
      if (NODE_ENVIRONMENT.includes(Env.nodeEnv) && Env.nodeEnv !== 'production') return callback(null, true);

      return callback(new Error('Origin is required in production environment'));
    }

    if (allowedOrigins.includes(requestOrigin)) return callback(null, true);

    return callback(new Error(`Origin "${requestOrigin}" is not allowed by CORS policy`));
  },
  // Access-Control-Allow-Credentials
  credentials: true,
  // Provides a status code to use for successful OPTIONS requests
  optionsSuccessStatus: StatusCodes.NO_CONTENT,
  // Access-Control-Allow-Methods
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  // Access-Control-Allow-Headers
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}

export const corsMiddleware = cors(corsOptions);
