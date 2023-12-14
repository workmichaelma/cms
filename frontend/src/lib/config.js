export const isDev = process.env.NODE_ENV === 'development';

export const basename = '/admin';
export const backend = isDev ? 'http://localhost' : '';

export const apikey = process.env.apikey || 'y6bslj9t15YkjqGDbkdOf2qLScLsef1A';
