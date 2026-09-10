import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: projectRoot,
  plugins: [react()],
  server: {
    fs: {
      // Keep Vite's file-system scope inside client instead of walking into OneDrive parents.
      allow: [projectRoot],
    },
  },
});
