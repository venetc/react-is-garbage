import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [react({
    jsxImportSource: '@welldone-software/why-did-you-render',
  })],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.ts',
  },
});
