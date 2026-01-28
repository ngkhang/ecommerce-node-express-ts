/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-28
 ------------------------------------------------- */

import dotEnv from 'dotenv';
import * as z from 'zod';

export const NODE_ENVIRONMENT = ['development', 'test', 'production'] as const;

dotEnv.config({
  quiet: process.env.NODE_ENV === 'test',
  path: '.env',
});

const envSchema = z.object({
  NODE_ENV: z.enum(NODE_ENVIRONMENT).default('development'),
  APP_PORT: z.coerce.number().int().min(0).max(65535),
  APP_HOST: z.string().min(1),
  APP_CORS_ORIGINS: z.string().min(1),
  DB_MONGODB_URI: z.url(),
});

const parsedEnv = envSchema.parse(process.env);

export const Env = {
  nodeEnv: parsedEnv.NODE_ENV,
  app: {
    host: parsedEnv.APP_HOST,
    port: parsedEnv.APP_PORT,
    corsOrigins: parsedEnv.APP_CORS_ORIGINS,
  },
  db: {
    uri: parsedEnv.DB_MONGODB_URI,
  },
};

export type Env = typeof Env;
