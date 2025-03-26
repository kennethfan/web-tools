<template>
  <div class="tool-container">
    <div class="tool-wrapper">
      <textarea
        v-model="jwtInput"
        placeholder="输入JWT令牌"
        class="textarea"
        rows="3"
      ></textarea>
      
      <div class="button-group">
        <button @click="parseJwt" class="action-button">解析</button>
      </div>

      <pre class="result-area">{{ parsedResult }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const jwtInput = ref('');
const parsedResult = ref('');

const parseJwt = () => {
  try {
    const [headerEncoded, payloadEncoded] = jwtInput.value.split('.');
    
    if (!headerEncoded || !payloadEncoded) {
      throw new Error('无效的JWT格式');
    }

    const parsePart = (encoded: string) => {
      const decoded = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.stringify(JSON.parse(decoded), null, 2);
    };

    parsedResult.value = `Header:\n${parsePart(headerEncoded)}\n\nPayload:\n${parsePart(payloadEncoded)}`;
    
  } catch (error) {
    parsedResult.value = `解析错误: ${error instanceof Error ? error.message : '未知错误'}`;
  }
};
</script>

<style scoped>
.tool-container {
  height: 100%;
}

.tool-wrapper {
  display: flex;
  gap: 20px;
  height: 100%;
}

.textarea {
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  resize: vertical;
}

.result-area {
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8f9fa;
  white-space: pre-wrap;
  overflow: auto;
}

/* 复用现有按钮样式 */
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
</style>