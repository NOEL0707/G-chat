import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'firebase/app': 'firebase/app',
      'firebase/firestore': 'firebase/firestore',
      'firebase/auth': 'firebase/auth',
      'firebase/storage': 'firebase/storage',
      'firebase/functions': 'firebase/functions',
    },
  },
})
