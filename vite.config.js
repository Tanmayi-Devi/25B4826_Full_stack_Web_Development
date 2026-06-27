import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/25B4826_Full_stack_Web_Development/', // Tell Vite this is a GitHub project sub-path
})
