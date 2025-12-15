import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  plugins: [handlebars()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
        500: resolve(__dirname, '500.html'),
      },
    },
  },
  server: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/404$/, to: '/404.html' },
        { from: /^\/500$/, to: '/500.html' },
      ],
    },
  },
})