const { Storage } = require('@google-cloud/storage');
import { forEach, isEmpty, reduce, set } from 'lodash';

import Model from '../base/model';
import Route from './route';
import * as setting from './setting';

import { BUCKET } from '../../config';

const storage = new Storage({
  projectId: BUCKET.project_name,
  keyFilename: BUCKET.service_key
});

export default class UserModel extends Model {
  constructor() {
    super('file', setting);
    this.route = new Route(this);
  }

  async getFile(res, filename) {
    try {
      const bucket = storage.bucket(BUCKET.name);
      const file = bucket.file(filename);

      const data = await new Promise((resolve) => {
        file.download((err, fileData) => {
          if (err) {
            res.status(500).send('Error retrieving file from Google Cloud Storage');
            return;
          }

          resolve(fileData);
        });
      });

      return data;
    } catch (err) {
      console.error(`Failed to get file, filename: ${filename}, error: `, err);
      return null;
    }
  }

  async fileHandler(req) {
    const { body, files } = req;
    try {
      if (files && !isEmpty(files) && body && !isEmpty(body)) {
        const requests = [];
        for (const file of files) {
          const result = await this.uploadFile(file);
          requests.push(result);
        }

        const result = await Promise.all(requests);
        const data = reduce(
          result,
          (prev, filedata) => {
            if (filedata?._id && filedata?.fieldname) {
              set(prev, filedata.fieldname, filedata._id);
            }
            return prev;
          },
          body
        );

        return data;
      }

      return body;
    } catch (err) {
      console.error(`Failed to upload files, err: `, err);
      return body;
    }
  }

  async uploadFile(file) {
    try {
      return new Promise((resolve, reject) => {
        const { originalname, size, mimetype, fieldname } = file;

        const timestamp = Math.floor(Date.now() / 1000);
        const rawName = Buffer.from(originalname, 'latin1').toString('utf-8');
        const filename = `${timestamp}-${rawName}`;

        const bucket = storage.bucket(BUCKET.name);
        const gcsFile = bucket.file(filename);
        const stream = gcsFile.createWriteStream({
          metadata: {
            contentType: mimetype
          }
        });
        stream.on('error', (err) => {
          console.error(err);
          reject(err);
        });
        stream.on('finish', async () => {
          const url = `https://storage.googleapis.com/${bucket.name}/${filename}`;
          const { _doc } = await this.insertOne({
            data: {
              name: rawName,
              filename,
              size,
              mimetype,
              url
            }
          });
          if (_doc && _doc._id) {
            resolve({
              _id: _doc._id,
              fieldname
            });
          } else {
            reject(new Error(`Could not insert ${filename} file`));
          }
        });
        stream.end(file.buffer);
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
