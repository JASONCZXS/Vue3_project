import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  base: '/Vue3_project/',
  plugins: [
    vue(),
    // 自动导入Element Plus组件和API
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  //resolve是用来配置路径别名的
  resolve:{
    alias:{
      	'@': '/src',
			  '~': '/src/assets'
    }
  }
})
