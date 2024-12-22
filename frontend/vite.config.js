import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert/localhost+3-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert/localhost+3.pem'))
    }
  }
})