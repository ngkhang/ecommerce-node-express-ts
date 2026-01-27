/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-27
 ------------------------------------------------- */

import dotEnv from 'dotenv';
import z from 'zod';

export const NODE_ENVIRONMENT = ['development', 'test', 'production'] as const;

dotEnv.config({
  quiet: process.env.NODE_ENV === 'test',
  path: '.env',
});

const envSchema = z.object({
  NODE_ENV: z.enum(NODE_ENVIRONMENT).default('development'),
  APP_PORT: z.coerce.number().int().min(0).max(65556),
  APP_HOST: z.string().min(1),
  APP_CORS_ORIGINS: z.string(),
})

const parsedEnv = envSchema.parse(process.env);

export const Env = {
  nodeEnv: parsedEnv.NODE_ENV,
  app: {
    host: parsedEnv.APP_HOST,
    port: parsedEnv.APP_PORT,
    corsOrigins: parsedEnv.APP_CORS_ORIGINS,
  }
}

export type Env = typeof Env;
