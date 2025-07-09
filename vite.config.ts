import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3002,
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/usuarios': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/funcionarios': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/funcoes': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
