/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-28
 ------------------------------------------------- */

import { createApp } from './app';

import { Env } from '~/config/env.config';

const { host, port } = Env.app;

const server = async () => {
  const app = createApp();

  app.listen(port, () => {
    console.info(`Server is running at: http://${host}:${port}`);
  });
};

server().catch((error) => {
  console.error(error);
  process.exit(1);
});
