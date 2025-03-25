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
          <label for="qrSize">二维码大小:</label>
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
        <div v-html="setQrCodeSize(qrCodeSvg)"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import qrcode from 'qrcode-generator';

const inputText = ref('');
const qrCodeSvg = ref('');
const qrSize = ref(200); // 默认二维码大小为 200px

const generateQrCode = () => {
  const typeNumber = 4;
  const errorCorrectionLevel = 'L';
  const qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(inputText.value);
  qr.make();
  qrCodeSvg.value = qr.createSvgTag({
    cellSize: qrSize.value / qr.getModuleCount(),
    // cellColor: '#000000',
    margin: 0,
    // 这里传入的 width 可能不生效，后续手动修改
    // width: qrSize.value, 
  });
};

// 新增方法，手动修改 SVG 的 width 和 height 属性
const setQrCodeSize = (svg: string) => {
  return svg.replace(/width="\d+"/, `width="${qrSize.value}"`).replace(/height="\d+"/, `height="${qrSize.value}"`);
};
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
}

.input-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
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