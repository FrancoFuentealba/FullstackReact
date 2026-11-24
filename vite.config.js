import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      hmr: { host: 'localhost', clientPort: 5173 },
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.js',
      coverage: {
        provider: 'v8',
        include: ['src/utils/**', 'src/components/**', 'src/services/**', 'src/context/**', 'src/hooks/**'],
      },
    },
  }
})