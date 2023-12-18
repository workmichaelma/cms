import { config } from 'dotenv';
config();
const { mode, BUCKET_NAME, BUCKET_PROJECT_ID, DB_PREFIX, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } =
  process.env;

let DATABASE_PREFIX = DB_PREFIX || 'mongodb+srv';
let DATABASE_HOST = DB_HOST;
let DATABASE_USERNAME = DB_USER;
let DATABASE_PASSWORD = DB_PASSWORD;
let DATABASE_NAME = DB_NAME;
let DATABASE_PORT = DB_PORT;
let DATABASE_QUERY = '?authSource=admin';
// if (mode !== 'local') {
//   DATABASE_HOST = 'vms.isnc85f.mongodb.net';
//   DATABASE_USERNAME = 'wccl-mongodb';
//   DATABASE_PASSWORD = 'XmVF1rDRdr41qgSq';
//   DATABASE_PORT = '';
//   DATABASE_PREFIX = 'mongodb+srv';
//   DATABASE_QUERY = '?retryWrites=true&w=majority&useUnifiedTopology=true';
// }

if (mode === 'dev' || mode === 'preprod' || mode === 'uat') {
  DATABASE_NAME = `${DB_NAME}-${mode}`;
}

if (mode === 'prod') {
  DATABASE_NAME = DB_NAME;
}

export const DATABASE = {
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  db: DATABASE_NAME,
  port: DATABASE_PORT ? `:${DATABASE_PORT}` : '',
  prefix: DATABASE_PREFIX,
  query: DATABASE_QUERY
};

export const BUCKET = {
  name: BUCKET_NAME,
  project_name: BUCKET_PROJECT_ID,
  service_key: 'service-key.json'
};

export const SEESSION_SECRET = 'session_secret';

export const API_KEY = process.env.API_KEY || 'y6bslj9t15YkjqGDbkdOf2qLScLsef1A';
