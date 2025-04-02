import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/json-formatter',
    name: 'JsonFormatter',
    component: () => import('../views/JsonFormatter.vue')
  },
  {
    path: '/base64',
    name: 'Base64Tool',
    component: () => import('../views/Base64Tool.vue')
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
  },
  {
    path: '/qr-code-generator',
    name: 'QrCodeGenerator',
    component: () => import('../views/QrCodeGenerator.vue')
  },
  {
    path: '/jwt-parser',
    name: 'JwtParserTool',
    component: () => import('../views/JwtParserTool.vue'),
    meta: { title: 'JWT解析' }
  },
  {
    path: '/rmb-converter',
    name: 'RmbConverter',
    component: () => import('../views/RmbConverter.vue'),
    meta: { title: '人民币转换' }
  },
  {
    path: '/json-to-class',
    name: 'JsonToClass',
    component: () => import('../views/JsonToClass.vue'),
    meta: { title: 'JSON转类定义' }
  }
];

const router = createRouter({
  history: createWebHistory('/web-tools/'), 
  routes
});

export default router;