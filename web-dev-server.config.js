/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
  middleware: [
    async (ctx, next) => {
      await next();

      const isHtmlRequest =
        ctx.request.method === 'GET' &&
        ctx.request.headers.accept?.includes('text/html');

      const isMissing =
        (ctx.status === 404 || ctx.response.status === 404) &&
        !ctx.body &&
        isHtmlRequest;

      if (isMissing) {
        ctx.status = 200;
        ctx.body = await fs.readFile(path.join(__dirname, 'index.html'), 'utf-8');
        ctx.response.set('Content-Type', 'text/html');
      }
    }
  ]
};
