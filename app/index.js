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

app.use(express.static(path.join(__dirname, '/admin-panel')));
app.use('/admin', (req, res, next) => {
  if (process.env.mode === 'prod' || process.env.mode === 'staging') {
    res.set('Cache-Control', 'public, max-age=36000');
  }
  res.sendFile(path.join(__dirname, '/admin-panel', 'index.html'));
});

routes(app);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log('Running on ' + PORT + ', mode: ' + process.env.mode);
});
