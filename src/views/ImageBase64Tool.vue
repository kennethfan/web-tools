<template>
  <div class="image-base64-container">
    <h1>图片 Base64 转换工具</h1>
    <div class="tool-wrapper">
      <div class="input-section">
        <textarea 
          v-model="base64Input" 
          placeholder="输入Base64编码"
          class="textarea"
        ></textarea>
      </div>
      
      <div class="button-group">
        <button @click="convertToImage" class="action-button">转换 →</button>
      </div>
      
      <div class="output-section">
        <img v-if="imageUrl" :src="imageUrl" class="preview-image" alt="预览图片" />
        <div v-else class="placeholder">图片预览区域</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const base64Input = ref('');
const imageUrl = ref('');

const convertToImage = () => {
  try {
    // 检查是否包含 data:image 头部
    const base64Data = base64Input.value.includes('data:image') 
      ? base64Input.value 
      : `data:image/png;base64,${base64Input.value}`;
    
    imageUrl.value = base64Data;
  } catch (error) {
    console.error('转换失败:', error);
    imageUrl.value = '';
  }
};

// 监听输入变化，实时转换
watch(base64Input, () => {
  if (base64Input.value) {
    convertToImage();
  } else {
    imageUrl.value = '';
  }
});
</script>

<style scoped>
.image-base64-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-wrapper {
  display: flex;
  gap: 20px;
  height: 500px;
}

.input-section, .output-section {
  flex: 1;
  display: flex;
  flex-direction: column;
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

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.output-section {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.placeholder {
  color: #6c757d;
  font-size: 16px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
</style>