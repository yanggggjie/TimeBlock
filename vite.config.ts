import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import generouted from '@generouted/react-router/plugin'

// https://vite.dev/config/
export default defineConfig({
  base: '/TimeBlock/',
  plugins: [react(), generouted()],
})
