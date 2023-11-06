import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path"
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', "mask-icon.png"],
    registerType: 'autoUpdate',
    injectRegister: 'auto',

    manifest: {
      "theme_color": "#1d1535",
      "background_color": "#1d1535",
      "display": "standalone",
      "scope": "/",
      "start_url": "/",
      "name": "2048 Game",
      "orientation": "portrait-primary",
      "short_name": "2048 Game",
      "description": "2048 Game Created By Tiqdev",
      "icons": [
        {
          "src": "/image/png/192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/image/png/512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    },
    workbox: {
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: false,
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    }
  })],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})

