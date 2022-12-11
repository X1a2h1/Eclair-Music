import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from "./router/Index.js";

createApp(App).use(ElementPlus).use(router).use(createPinia()).mount('#app')
