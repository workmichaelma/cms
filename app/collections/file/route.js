// import { Router } from 'express';
import Route from '../base/route';

export default class FileRoute extends Route {
  constructor(model) {
    super(model);
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
