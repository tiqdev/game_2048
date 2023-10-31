import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path"
import { VitePWA } from "vite-plugin-pwa";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    manifest: {
      name: '2048 tiqdev',
      short_name: '2048',
      description: '2048 game created by tiqdev',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      clientsClaim: true,
      skipWaiting: true
    }
  })],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})

