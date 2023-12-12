import cors from 'cors';
import path from 'path';
import express from 'express';

import { DATABASE } from './config';

import { routes } from './collections';
import connectMongoDB from './db';

const app = express();
const isLocal = process.env.mode === 'local';

if (isLocal) {
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
}

console.log(DATABASE);
connectMongoDB(app);

console.log('testing')

routes(app);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log('Running on ' + PORT + ', mode: ' + process.env.mode);
});
