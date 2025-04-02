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
        <vue-json-pretty
          v-if="!formattedJson.startsWith('❌')"
          :data="parsedJson"
          :deep="3"
          :show-line="true"
          :show-length="true"
          :collapsed-on-click-bracket="true"
          theme="light"
          class="json-output"
        />
        <div v-else class="error-message">
          {{ formattedJson }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { ref, watch } from 'vue'; // 导入 ref

// 存储用户输入的 JSON 数据
const inputJson = ref('');
// 存储格式化后的 JSON 数据
const formattedJson = ref('');

// 新增解析后的JSON对象
const parsedJson = ref({});

const formatJson = () => {
  try {
    parsedJson.value = JSON.parse(inputJson.value);
    formattedJson.value = JSON.stringify(parsedJson.value, null, 2);
  } catch (error) {
    console.log('json解析错误', error);
    formattedJson.value = '❌ 格式错误';
    parsedJson.value = {};
  }
};

const handleCopy = () => {
  navigator.clipboard.writeText(formattedJson.value);
};

const handleDownload = () => {
  const blob = new Blob([formattedJson.value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `formatted_${Date.now()}.json`;
  a.click();
};

// 添加输入内容实时监听
watch(inputJson, (newVal) => {
  if (newVal.trim().length > 0) {
    formatJson();
  }
});
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

.json-output {
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-height: 60vh;
  overflow: auto;
}
  
/* 添加行号样式 */
:deep(.vjs-line-number) {
  color: #6c757d;
  min-width: 40px;
  padding-right: 15px;
  border-right: 1px solid #495057;
  margin-right: 12px;
  user-select: none;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.copy-button, .download-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  background: #007BFF;
  color: white;
}

.copy-button:hover, .download-button:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

.error-message {
  color: #dc3545;
  background: #ffeef0;
  padding: 12px;
  border-radius: 6px;
  margin-top: 15px;
}
</style>