import { createApp } from 'vue'
import App from './App.vue'
// 引入全局样式
import '@/assets/less/index.less'
// 引入路由
import router from './router/index.ts'
// 引入Element Plus自动导入(已配置vite.config.ts)
// 引入Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入Pinia状态管理
import { createPinia } from 'pinia'
import { useMenuStore } from '@/stores/menu'
// 引入Pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
//mock引入
import "@/api/index.ts"

const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)
app.use(pinia)

const menuStore = useMenuStore()
//刷新时强制重置
menuStore.addMenu(router)
// 动态路由添加后再挂载到app！！！(保证刷新时路由存在)
app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})

// 全局注册Element Plus图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

