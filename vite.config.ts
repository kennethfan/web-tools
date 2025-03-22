import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  // 指定二级目录为 web-tools
  base: '/web-tools/', 
  plugins: [vue()],
});
