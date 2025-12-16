import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  plugins: [handlebars()],
  assetsInclude: ["**/*.hbs"],
  server: {
    port: 3000
  }
})