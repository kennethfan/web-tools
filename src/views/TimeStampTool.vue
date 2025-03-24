<template>
  <div class="timestamp-container">
    <h1>时间戳转换工具</h1>
    <div class="tool-wrapper">
      <textarea
        v-model="inputText"
        placeholder="输入时间戳（支持10位/13位）"
        class="textarea"
      ></textarea>

      <div class="button-group">
        <button @click="timestampToDate" class="action-button">转日期 →</button>
        <button @click="dateToTimestamp" class="action-button">← 转时间戳</button>
      </div>

      <textarea
        v-model="outputDate"
        placeholder="输入日期（如：2023-01-01）"
        class="textarea"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputText = ref('');
const outputDate = ref('');

// 时间戳转日期
const timestampToDate = () => {
  try {
    const timestamp = inputText.value.length === 10 ? 
      parseInt(inputText.value) * 1000 : 
      parseInt(inputText.value);
    
    const date = new Date(timestamp);
    // 格式化为：YYYY-MM-DD HH:mm:ss.SSS
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    outputDate.value = 
      `${date.toLocaleDateString()} ` +
      `${date.toLocaleTimeString()}.${milliseconds}`;
      
  } catch (error) {
    outputDate.value = '无效时间戳格式';
  }
};

// 日期转时间戳
const dateToTimestamp = () => {
  try {
    const timestamp = Date.parse(outputDate.value);
    if (isNaN(timestamp)) throw new Error('无效日期');
    inputText.value = timestamp.toString();
  } catch (error) {
    inputText.value = '无效日期格式';
  }
};
</script>

<style scoped>
/* 复用 Base64Tool 的样式 */
.timestamp-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-wrapper {
  display: flex;
  gap: 20px;
  height: 500px;
}

.textarea {
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  resize: none;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.action-button {
  padding: 12px 24px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0056b3;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
</style>