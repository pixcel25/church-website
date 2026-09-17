import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // The React plugin enables JSX transformation and Fast Refresh during development.
  plugins: [react()],
})
