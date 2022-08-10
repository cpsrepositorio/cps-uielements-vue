import type { StorybookViteConfig } from '@storybook/builder-vite'
import { default as path } from 'node:path'
import { mergeConfig } from 'vite'

const config: StorybookViteConfig = {
  framework: '@storybook/vue3',
  stories: [
    {
      directory: '../stories/',
      files: '*.stories.@(mdx|ts)'
    }
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode'
  ],
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true
  },
  features: {
    storyStoreV7: true
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@cps/uielements-vue': path.resolve(__dirname, './module/')
        }
      }
    })
  }
}

export default config
