<template>
  <div class="qrcode-container">
    <h1>二维码生成工具</h1>
    <div class="tool-wrapper">
      <!-- 左侧输入区域 -->
      <div class="input-section">
        <textarea 
          v-model="inputText" 
          placeholder="输入要生成二维码的内容"
          class="textarea"
        ></textarea>
        <div class="input-group">
          <label for="qrSize">二维码大小：</label>
          <div class="range-container">
            <input 
              type="range"
              v-model="qrSize"
              id="qrSize"
              min="100"
              max="500"
              step="10"
              class="range-input"
            >
            <span class="size-indicator">{{ qrSize }}px</span>
          </div>
        </div>
        <div class="button-group">
          <button @click="generateQrCode" class="action-button">生成二维码</button>
        </div>
      </div>
      <!-- 右侧二维码输出区域 -->
      <div v-if="qrCodeSvg" class="qrcode-output">
        <!-- 修改这里，通过 v-html 插入修改后的 SVG -->
        <!-- 修改为直接使用 qrCodeSvg -->
        <div v-html="qrCodeSvg"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'; // 添加watch导入
import qrcode from 'qrcode-generator';

const inputText = ref('');
const qrCodeSvg = ref('');
const qrSize = ref(200);


const generateQrCode = async () => {
  try {
    const typeNumber = 4;
    const errorCorrectionLevel = 'L';
    const qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(inputText.value);
    qr.make();
    qrCodeSvg.value = qr.createSvgTag({
      cellSize: qrSize.value / qr.getModuleCount(),
      margin: 0,
    });
  } catch (error) {
    qrCodeSvg.value = '';
  }
};
// 添加size监听
watch(qrSize, generateQrCode); // 当尺寸变化时自动重新生成
// watch(inputText, generateQrCode); // 当内容变化时自动重新生成
</script>

<style scoped>
.qrcode-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-wrapper {
  display: flex;
  gap: 20px;
  height: 70vh;
}

.input-section {
  flex: 0 0 50%;
  width: 50%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}

.qrcode-output {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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

.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
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

.qrcode-output {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 添加滑块样式 */
.range-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-input {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e9ecef;
  outline: none;
  -webkit-appearance: none;
}

/* 滑块轨道 */
.range-input::-webkit-slider-runnable-track {
  height: 6px;
  background: #dee2e6;
  border-radius: 3px;
}

/* 滑块按钮 */
.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #007bff;
  border-radius: 50%;
  margin-top: -5px;
  transition: background 0.3s;
}

.range-input:hover::-webkit-slider-thumb {
  background: #0056b3;
}

.size-indicator {
  min-width: 60px;
  text-align: right;
  font-family: monospace;
  color: #495057;
}
</style>