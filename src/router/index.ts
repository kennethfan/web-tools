import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Define your routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/base64',
    name: 'Base64Tool',
    component: () => import('../views/Base64Tool.vue')
  },
  {
    path: '/json-formatter',
    name: 'JsonFormatter',
    component: () => import('../views/JsonFormatter.vue')
  },
  {
    path: '/urlencode',
    name: 'UrlEncodeTool',
    component: () => import('../views/UrlEncodeTool.vue')
  },
  {
    path: '/time-stamp',
    name: 'TimeStampTool',
    component: () => import('../views/TimeStampTool.vue')
  }
];

const router = createRouter({
  // 指定二级目录为 web-tools
  history: createWebHistory('/web-tools/'), 
  routes
});

export default router;