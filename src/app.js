import express from 'express';
import dotenv from 'dotenv';
import { router } from './router/index.js';

dotenv.config();
const app = express();

async function main() {
  try {
    app.use(express.json({ limit: '60mb', extends: true }));
    await import('./db/models/index.js');

    const port = process.env.PORT || 4000;

    app.use((req, res, next) => {
      console.log(req.method, req.path);
      next();
    });

    app.use(router);

    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

export default app;
