import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    host: true,
    globals: true,
    environment: 'jsdom', // Ini kunci biar "document is not defined" hilang
  },
});
