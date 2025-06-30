import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@assets': path.resolve(__dirname,"./src/assets")
    }
  }
});
