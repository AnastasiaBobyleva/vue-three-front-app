import './shared/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './app/router'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './shared/assets/custom-el-styles.scss'

// Web Viewer
import { type ViewerElement } from 'three-viewer'

const app = createApp(App)

app.use(ElementPlus, { size: 'default', zIndex: 3000 })
app.use(createPinia())
app.use(router)

app.mount('#app')
