/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config({
  path: '.env',
});

export default defineConfig({
  root: __dirname,
  base: './', // Use relative paths for all assets
  define: {
    'process.env': process.env,
  },
  build: {
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    outDir: 'dist', // Specify output directory
    assetsDir: 'assets', // Specify assets directory
  },
  plugins: [nxViteTsPaths()],
});
