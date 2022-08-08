import type { Component, Plugin } from 'vue'
import * as components from './components'
import './base.css'

const ComponentsLoader: Plugin = {
  install(app) {
    for (const prop in components) {
      if (Object.prototype.hasOwnProperty.call(components, prop)) {
        const component = (components as Record<string, Component>)[prop]
        app.component(component.name ?? prop, component)
      }
    }
  }
}

export * from './components'
export default ComponentsLoader
