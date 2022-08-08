const path = require('path')

module.exports = {
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
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@cps/uielements-vue': path.resolve(__dirname, './module/')
    }
    return config
  }
}
