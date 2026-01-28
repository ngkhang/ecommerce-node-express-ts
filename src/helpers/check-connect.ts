/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-28
 ------------------------------------------------- */

import * as os from 'os';
import process from 'process';

import mongoose from 'mongoose';

const MAX_CONNECTS = 5;
const MAX_TIME_CHECKING = 60000; // 1 minute

export const countConnectDb = (): number => {
  return mongoose.connections.length;
};

export const isOverloadDb = () => {
  setInterval(() => {
    const numCpus = os.cpus().length;
    const numConnects = countConnectDb();
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024; // MB

    const systemResourceUsage = `CPUs: ${numCpus} - Memory Usage: ${memoryUsage.toFixed(2)} MB - Connections: ${numConnects}`;

    console.info(systemResourceUsage);

    if (numConnects > MAX_CONNECTS) {
      console.info('Database connections overload detected');
      return true;
    }

    return false;
  }, MAX_TIME_CHECKING);
};
