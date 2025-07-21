<template>
  <nav>
    <ul class="tool-grid">
      <li><router-link to="/json-formatter" :class="{ 'active': $route.name === 'JsonFormatter' }">JSON 格式化</router-link></li>
      <li><router-link to="/base64" :class="{ 'active': $route.name === 'Base64Tool' }">Base64 编解码</router-link></li>
      <li><router-link to="/urlencode" :class="{ 'active': $route.name === 'UrlEncodeTool' }">URL 编解码</router-link></li>
      <li><router-link to="/time-stamp" :class="{ 'active': $route.name === 'TimeStampTool' }">时间戳转换</router-link></li>
      <li><router-link to="/qr-code-generator" :class="{ 'active': $route.name === 'QrCodeGenerator' }">二维码生成</router-link></li>
      <li><router-link to="/qr-code-scanner" :class="{ 'active': $route.name === 'QrCodeScanner' }">二维码识别</router-link></li>
      <li><router-link to="/jwt-parser" :class="{ 'active': $route.name === 'JwtParserTool' }">JWT 解析</router-link></li>
      <li><router-link to="/rmb-converter" :class="{ 'active': $route.name === 'RmbConverter' }">人民币转换</router-link></li>
      <li><router-link to="/json-to-class" :class="{ 'active': $route.name === 'JsonToClass' }">JSON转类定义</router-link></li>
      <li><router-link to="/image-base64" :class="{ 'active': $route.name === 'ImageBase64Tool' }">图片Base64转换</router-link></li>
      <li>
        <router-link to="/config-converter" :class="{ 'active': $route.name === 'ConfigConverter' }">
          配置文件互转
        </router-link>
      </li>
      <li>
        <router-link to="/avatar-generator" :class="{ 'active': $route.name === 'AvatarGenerator' }">
          姓名头像
        </router-link>
      </li>
      <li>
        <router-link to="/pornhub-style" :class="{ 'active': $route.name === 'PornhubStyleGenerator' }">
          Pornhub风格
        </router-link>
      </li>
      <li>
        <router-link to="/svg-viewer" :class="{ 'active': $route.name === 'SvgViewer' }">
          SVG展示与转换
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped>
.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  list-style-type: none;
  padding: 0;
}

.tool-grid li {
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 20px 10px;
  text-align: center;
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.tool-grid li a {
  text-decoration: none;
  color: #007BFF;
  font-size: 18px;
}

/* 优化后的高亮样式 */
.active {
  /* background-color: #007BFF; */
  /* color: white; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  transform: scale(1.15); /* 放大 5% */
}

.tool-grid li:hover {
  background-color: #e0e0e0; /* 鼠标悬停时的背景颜色 */
}

.tool-grid li a:hover {
  color: #0056b3; /* 鼠标悬停时链接文字颜色 */
}
</style>