import { Router } from 'express';
import multer from 'multer';

import { Collections } from './collections';

const upload = multer();

export default class Route {
  constructor() {
    const router = Router();
    this.router = router;

    this.user = null;

    this.router.use((req, res, next) => {
      if (req?.session?.user) {
        this.user = req.session.user;
      }

      next();
    });
  }

  get(path, handler, options = {}) {
    this.router.get(path, async (req, res) => {
      try {
        const data = await handler(req, res);

        const { sendCsv = false, customContentType } = options;

        if (data) {
          if (customContentType) {
            res.setHeader('Content-Type', customContentType);
          } else if (sendCsv) {
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
          } else {
            res.json(data);
          }
        } else {
          console.log(`No data will be send to client`);
        }
      } catch (err) {
        console.error(`GET ${path} error: ${err}`);
        res.status(500).send(null);
      }
    });
  }

  post(path, handler) {
    this.router.post(path, upload.any(), async (req, res) => {
      try {
        req.body = await Collections.File.fileHandler(req);
        const data = await handler(req, res);

        res.json(data);
      } catch (err) {
        console.error(`POST ${path} error: ${err}`);
        res.status(500).send(null);
      }
    });
  }

  put(path, handler) {
    this.router.put(path, upload.any(), async (req, res) => {
      try {
        req.body = await Collections.File.fileHandler(req);

        const data = await handler(req, res);

        res.json(data);
      } catch (err) {
        console.error(`PUT ${path} error: ${err}`);
        res.status(500).send(null);
      }
    });
  }

  delete(path, handler) {
    this.router.delete(path, async (req, res) => {
      try {
        const data = await handler(req, res);

        res.json(data);
      } catch (err) {
        console.error(`DELETE ${path} error: ${err}`);
        res.status(500).send(null);
      }
    });
  }

  get route() {
    return this.router;
  }
}
