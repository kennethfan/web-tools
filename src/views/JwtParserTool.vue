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

      <div class="result-container">
        <div class="result-section">
          <h3>Header</h3>
          <pre class="json-display">{{ formattedHeader }}</pre>
        </div>
        <div class="result-section">
          <h3>Payload</h3>
          <pre class="json-display">{{ formattedPayload }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 移除highlight.js相关导入
import { ref } from 'vue';

const jwtInput = ref('');
const formattedHeader = ref('');
const formattedPayload = ref('');

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

    formattedHeader.value = parsePart(headerEncoded);
    formattedPayload.value = parsePart(payloadEncoded);
    
  } catch (error) {
    formattedHeader.value = `解析错误: ${error instanceof Error ? error.message : '未知错误'}`;
    formattedPayload.value = '';
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

/* .result-area {
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8f9fa;
  white-space: pre-wrap;
  overflow: auto;
} */

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

.result-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.result-area {
  background-color: #1e1e1e;
  color: #dcdcdc;
  padding: 1rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.language-json {
  background: none !important;
  padding: 0 !important;
}
</style>

<style scoped>
.json-display {
  flex: 1;
  padding: 15px;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  background-color: #f8f9fa;
  white-space: pre-wrap;
  overflow: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  color: #2c3e50;
}

.json-display::selection {
  background: #b3d4fc;
}
</style>