import { default as vue } from '@vitejs/plugin-vue'
import { default as path } from 'node:path'
import { defineConfig } from 'vite'
import { default as svgLoader } from 'vite-svg-loader'
import { default as packageConfig } from './package.json' assert { type: 'json' }
import dts from 'vite-plugin-dts'

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
    svgLoader(),
    dts({
      outputDir: 'dist',
      include: ['./module/**/*'],
      staticImport: true,
      beforeWriteFile: (filePath: string, content: string) => {
        const isEntrypoint = filePath.endsWith(path.join('dist', 'index.d.ts'))
        return {
          filePath: isEntrypoint
            ? filePath.replace(
                path.join('dist', 'index.d.ts'),
                path.join('dist', 'cps-uielements-vue.d.ts')
              )
            : filePath,
          content
        }
      }
    })
  ],
  build: {
    minify: true,
    lib: {
      name: packageConfig.name,
      entry: path.resolve(__dirname, './module/index.ts'),
      fileName: (format) => `cps-uielements-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'tailwindcss'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
