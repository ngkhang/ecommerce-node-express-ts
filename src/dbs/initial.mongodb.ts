/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-28
 ------------------------------------------------- */

import mongoose from 'mongoose';

import { Env } from '~/config/env.config';

const MAX_POOL_SIZE = 50;

class Database {
  private static instance: Database | null = null;

  constructor() {
    this.connect();
  }

  private async connect() {
    if (Env.nodeEnv === 'development') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    try {
      await mongoose.connect(Env.db.uri, {
        maxPoolSize: MAX_POOL_SIZE,
      });
      console.info('Database connected');
    } catch (error) {
      console.error('Database connect failed:', error);
    }
  }

  public static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database();

    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
export default instanceMongoDB;
