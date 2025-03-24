<template>
  <div class="json-formatter-container">
    <h1 class="section-title">JSON 格式化</h1>
    <div class="tool-wrapper">
      <div class="input-section">
        <textarea v-model="inputJson" placeholder="请输入 JSON 数据" class="input-textarea"></textarea>
      </div>
      
      <div class="button-group">
        <button @click="formatJson" class="format-button">格式化</button>
      </div>

      <div class="output-section">
        <pre v-if="formattedJson" class="output-pre">{{ formattedJson }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 存储用户输入的 JSON 数据
const inputJson = ref('');
// 存储格式化后的 JSON 数据
const formattedJson = ref('');

const formatJson = () => {
  try {
    // 解析用户输入的 JSON 数据
    const parsed = JSON.parse(inputJson.value);
    // 将解析后的数据进行格式化，缩进为 2 个空格
    formattedJson.value = JSON.stringify(parsed, null, 2);
  } catch (error) {
    // 若输入的 JSON 数据格式有误，给出错误提示
    formattedJson.value = '输入的 JSON 数据格式有误';
  }
};
</script>

<style scoped>
.json-formatter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-wrapper {
  display: flex;
  gap: 20px;
  height: 500px;
}

/* 新增按钮组样式 */
.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

/* 调整输入输出区域为等宽 */
.input-section,
.output-section {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
}

.section-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}

.input-textarea {
  width: 100%;
  height: 400px;
  /* margin-bottom: 15px; */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
}

.format-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.format-button:hover {
  background-color: #0056b3;
}

.output-pre {
  margin-top: 0px;
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  white-space: pre-wrap;
  height: auto;
  min-height: 200px;
  font-size: 16px;
}
</style>