import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'static',
  },
  plugins: [
      legacy({
    targets: ['defaults', 'not IE 11']
  }),
    vue()
  ],
  server: {
    port: 8080,
    open: true,
    base: './',
  //   proxy: {
  //     '^/api': {
  //   // target: 'https://space.bilibili.com/ajax/Bangumi', // 后端服务实际地址
  //       target: 'http://api.bilibili.com/x/space/bangumi',
  //   changeOrigin: true, //开启代理
  //   rewrite: (path) => path.replace(/^\/api/, '')
  // }
  //   }
  }
})
