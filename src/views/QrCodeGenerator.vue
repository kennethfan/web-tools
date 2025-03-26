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
          <label for="qrSize">二维码大小(单位:px):</label>
          <input 
            type="number" 
            v-model="qrSize" 
            id="qrSize" 
            min="100" 
            placeholder="请输入二维码大小，单位:px"
          />
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


const generateQrCode = () => {
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
</style>