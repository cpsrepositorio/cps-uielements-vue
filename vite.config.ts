import { default as vue } from '@vitejs/plugin-vue'
import { default as path } from 'node:path'
import { defineConfig } from 'vite'
import { default as svgLoader } from 'vite-svg-loader'
import { default as packageConfig } from './package.json' assert { type: 'json' }

export default defineConfig({
  resolve: {
    alias: {
      '@cps/uielements-vue': path.resolve(__dirname, './module/')
    }
  },
  plugins: [
    vue({
      reactivityTransform: true
    }),
    svgLoader()
  ],
  build: {
    lib: {
      name: packageConfig.name,
      entry: path.resolve(__dirname, './module/index.ts'),
      fileName: (format) => `cps-uielements-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'tailwindcss'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
