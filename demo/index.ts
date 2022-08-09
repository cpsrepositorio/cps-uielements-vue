import '@cps/uielements-vue/style.css'
import UIElements from '@cps/uielements-vue'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(UIElements)
app.mount('#app')
