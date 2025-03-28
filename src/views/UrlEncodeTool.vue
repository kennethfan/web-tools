<template>
  <div class="urlencode-container">
    <h1>URL 编解码工具</h1>
    <div class="tool-wrapper">
      <textarea 
        v-model="inputText" 
        placeholder="输入待编码/解码内容"
        class="textarea"
      ></textarea>
      
      <div class="button-group">
        <button @click="encode" class="action-button">编码 →</button>
        <button @click="decode" class="action-button">← 解码</button>
      </div>
      
      <textarea
        v-model="outputText"
        placeholder="输出结果"
        class="textarea"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputText = ref('');
const outputText = ref('');

const encode = () => {
  try {
    outputText.value = encodeURIComponent(inputText.value);
  } catch (error) {
    outputText.value = '编码错误';
  }
};

const decode = () => {
  try {
    inputText.value = decodeURIComponent(outputText.value);
  } catch (error) {
    inputText.value = '解码错误：非法的URL编码';
  }
};
</script>

<style scoped>
/* 复用 Base64Tool 的样式 */
.urlencode-container {
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