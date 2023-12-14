import fs from 'fs';
import path from 'path';

import LogModel from './log/model';
import UserModel from './user/model';
import { forEach, lowerCase } from 'lodash';
import { API_KEY } from '../config';

const Log = new LogModel();
const User = new UserModel();

export const bindCurrentUser = (req) => {
  const userId = req?.session?.user?._id;
  console.log(`bind current user: ${userId}`);
  if (userId) {
    forEach(Models, (model) => {
      model.user = req.session.user._id;
    });
  }
};

export const Models = {
  Log,
  User
};

export const routes = (app) => {
  app.use((req, res, next) => {
    try {
      const apikey = req.headers.apikey;

      if (apikey && apikey === API_KEY) {
        bindCurrentUser(req);
        next();
      } else {
        throw new Error('apikey is not correct');
      }
    } catch (err) {
      console.log(`Failed to access service, error: ${err}`);
      res.status(500).json(null);
    }
  });

  forEach(Models, (model, collection) => {
    app.use(
      `/api/collection/${collection.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
      model?.route?.routes?.router
    );
  });

  return app;
};

// export const routes = (app) => {
//   const currentModulePath = path.dirname(__filename);
//   const normalizedPath = path.join(currentModulePath, '.');

//   for (const collection of fs.readdirSync(normalizedPath)) {
//     if (collection !== 'base' && collection !== 'index.js') {
//       import(`./${collection}/model.js`).then((module) => {
//         const Model = module.default;
//         const model = new Model();
//         app.use(`/api/collection/${collection}`, model?.route?.routes?.router);
//       });
//     }
//   }

//   return app;
// };
