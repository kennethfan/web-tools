<template>
  <div>
    <h1>Indexes</h1>
    <nav>
      <ul class="tool-grid">
        <li><router-link to="/json-formatter">JSON 格式化</router-link></li>
        <!-- 可以添加更多工具链接 -->
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
// 这里可以添加后续的交互逻辑
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
}

.tool-grid li a {
  text-decoration: none;
  color: #007BFF;
  font-size: 18px;
}

.tool-grid li a:hover {
  text-decoration: underline;
}

/* 添加 h1 文字居中样式 */
h1 {
  text-align: center;
}
</style>