<template>
  <nav>
    <ul class="tool-grid">
      <li><router-link to="/json-formatter">JSON 格式化</router-link></li>
      <li><router-link to="/base64">Base64 编解码</router-link></li>
      <li><router-link to="/urlencode">URL 编解码</router-link></li>
      <li><router-link to="/time-stamp">时间戳转换</router-link></li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
// 导航菜单逻辑，目前为空
</script>

<style scoped>
.tool-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  list-style-type: none;
  padding: 0;
}

.tool-grid li {
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.tool-grid li a {
  text-decoration: none;
  color: #007BFF;
  font-size: 18px;
}
</style>