import process from 'process';
import { ensureStartsWith } from '../lib/utils';

const { STORE_DOMAIN, PORT = 3000 } = process.env;

const baseUrl = STORE_DOMAIN
  ? ensureStartsWith(STORE_DOMAIN, 'https://')
  : `http://localhost:${PORT}`;

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*'
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
