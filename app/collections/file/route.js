// import { Router } from 'express';
import Route from '../base/route';

export default class FileRoute extends Route {
  constructor(model) {
    super(model);

    this.routes.get('/file/:filename', async (req, res) => {
      const { filename } = req.params;

      const file = await this.model.getFile(res, filename);

      res.setHeader('Content-Type', 'image/png');
      res.send(file);
    });
  }

  async getEntity({ _id, fieldsToDisplay }) {
    try {
      const { data, metadata } = await super.getEntity({ _id, fieldsToDisplay });

      return {};
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
