import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "10.5.5.211",
    // host: "10.13.129.148", //ip của CIT
    port:3001,
    proxy: {
      "/api": {
        // target: "http://10.13.129.148:3000/", //ip của CIT
        target: "http://10.5.5.211:3000/",
        changeOrigin: true,
      },
    }
  },
})
