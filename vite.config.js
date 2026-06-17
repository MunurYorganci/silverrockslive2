import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index:      resolve(__dirname, 'index.html'),
        restaurant: resolve(__dirname, 'restaurant.html'),
        cafe:       resolve(__dirname, 'cafe.html'),
        pool:       resolve(__dirname, 'pool.html'),
        about:      resolve(__dirname, 'about.html'),
        contact:    resolve(__dirname, 'contact.html'),
        adminLogin:     resolve(__dirname, 'admin/login.html'),
        adminDashboard: resolve(__dirname, 'admin/dashboard.html'),
      }
    }
  }
})
