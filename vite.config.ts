import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://buslivebackend-dphfy.ondigitalocean.app:3001',  // Update with your backend URL
        changeOrigin: true,
        secure: true,  // Set to true if using HTTPS
      },
    },
  },
});
