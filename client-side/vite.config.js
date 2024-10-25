import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/apii': {
            target: 'http://localhost:7007', // Your backend API
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/apii/, ''),
        }
    }
}

})
