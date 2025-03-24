<template>
  <div>
    <h1>工具列表</h1>
    <nav>
      <ul class="tool-grid">
        <li><router-link to="/json-formatter">JSON 格式化</router-link></li>
        <li><router-link to="/base64">Base64 编解码</router-link></li>
        <li><router-link to="/urlencode">URL 编解码</router-link></li>
      </ul>
    </nav>
  </div>
</template>

// 保留原有样式，移除与 base64 相关的代码
<script lang="ts" setup>
// 确保此处只有导航相关逻辑
</script>

<style scoped>
/* 保持原有的工具网格样式不变 */
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