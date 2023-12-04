export const isDev = process.env.NODE_ENV === 'development';

export const basename = '/admin';
export const backend = isDev ? 'http://localhost' : '';
