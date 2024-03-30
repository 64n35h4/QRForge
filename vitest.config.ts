/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['html'],
      exclude: [
        ...configDefaults.exclude,
        '**/__mocks__/**',
        '**/__tests__/**',
        '**/.next/**',
        '**/pages/**',
        '**/auth/**',
        '**/middleware.ts',
        '**/*.config.js',
        '**/*.config.ts',
        '**/layout.tsx',
      ],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
})
