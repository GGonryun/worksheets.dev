/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config({
  path: '.env',
});

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/games/block-bash',
  base: './', // Use relative paths for all assets

  define: {
    'process.env': process.env,
  },

  server: {
    port: 7010,
    host: 'localhost',
  },

  plugins: [nxViteTsPaths()],

  build: {
    outDir: '../../../dist/apps/games/block-bash',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
