import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
  };

  if (command !== 'serve') {
    config.base = '/invoicemanagement/';
  }

  return config;
});
