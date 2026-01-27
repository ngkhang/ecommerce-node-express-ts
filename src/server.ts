/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-27
 ------------------------------------------------- */

import { createApp } from "./app";

const PORT = 3000;
const HOST = 'localhost';

const server = async () => {
  const app = createApp();

  app.listen(PORT, () => {
    console.info(`Server is running at: http://${HOST}:${PORT}`);
  })
}

server()
  .catch((error) => {
    console.error(error);
    process.exit(1)
  })
