import type { Parameters } from '@storybook/api'
import '../module/style.css'

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    disable: true
  },
  darkMode: {
    darkClass: 'dark',
    classTarget: 'html',
    stylePreview: true
  },
  viewport: {
    viewports: {
      phoneSmall: {
        name: 'Phone small (all: 320px)',
        styles: {
          width: '320px',
          height: '568px'
        },
        type: 'mobile'
      },
      phoneSmallLandscape: {
        name: 'Phone small landscape (640px)',
        styles: {
          width: '568px',
          height: '320px'
        },
        type: 'mobile'
      },
      phoneLarge: {
        name: 'Phone large (xs: 414px)',
        styles: {
          width: '414px',
          height: '736px'
        },
        type: 'mobile'
      },
      phoneLargeLandscape: {
        name: 'Phone large landscape (736px)',
        styles: {
          width: '736px',
          height: '414px'
        },
        type: 'mobile'
      },
      tabletSmall: {
        name: 'Tablet small (md: 768px)',
        styles: {
          width: '768px',
          height: '1024px'
        },
        type: 'tablet'
      },
      tabletLarge: {
        name: 'Tablet large (lg: 1024px)',
        styles: {
          width: '1024px',
          height: '1366px'
        },
        type: 'tablet'
      },
      desktopSmall: {
        name: 'Desktop small (xl: 1280px)',
        styles: {
          width: '1280px',
          height: '800px'
        },
        type: 'desktop'
      },
      desktopLarge: {
        name: 'Desktop large (2xl: 1536px)',
        styles: {
          width: '1600px',
          height: '864px'
        },
        type: 'desktop'
      }
    }
  }
}
