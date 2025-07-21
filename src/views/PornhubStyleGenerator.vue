<template>
  <div class="pornhub-style-container">
    <h1>Pornhub 风格图片生成工具</h1>
    <div class="tool-wrapper">
      <div class="input-section">
        <div class="form-group">
          <label for="first-text">第一部分文字</label>
          <input 
            id="first-text"
            v-model="firstText" 
            placeholder="请输入第一部分文字（黑底白字）"
            class="text-input"
            @input="generateImage"
          />
        </div>
        
        <div class="form-group">
          <label for="second-text">第二部分文字</label>
          <input 
            id="second-text"
            v-model="secondText" 
            placeholder="请输入第二部分文字（黑底黄字）"
            class="text-input"
            @input="generateImage"
          />
        </div>
        
        <div class="form-group">
          <label>字体大小</label>
          <div class="size-slider">
            <input 
              type="range" 
              v-model="fontSize" 
              min="20" 
              max="80" 
              step="2"
              @input="generateImage"
            />
            <span>{{ fontSize }}px</span>
          </div>
        </div>
        
        <div class="form-group">
          <label>图片宽度</label>
          <div class="size-slider">
            <input 
              type="range" 
              v-model="imageWidth" 
              min="300" 
              max="800" 
              step="10"
              @input="generateImage"
            />
            <span>{{ imageWidth }}px</span>
          </div>
        </div>
        
        <div class="form-group">
          <label>图片高度</label>
          <div class="size-slider">
            <input 
              type="range" 
              v-model="imageHeight" 
              min="100" 
              max="400" 
              step="10"
              @input="generateImage"
            />
            <span>{{ imageHeight }}px</span>
          </div>
        </div>
        
        <div class="form-group">
          <label>圆角大小</label>
          <div class="size-slider">
            <input 
              type="range" 
              v-model="borderRadius" 
              min="0" 
              max="20" 
              step="1"
              @input="generateImage"
            />
            <span>{{ borderRadius }}px</span>
          </div>
        </div>
      </div>
      
      <div class="preview-section">
        <div class="image-preview">
          <div 
            class="pornhub-style-image" 
            :style="{
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
              borderRadius: `${borderRadius}px`,
              fontSize: `${fontSize}px`,
            }"
          >
            <span class="first-part">{{ firstText }}</span>
            <span class="second-part">{{ secondText }}</span>
          </div>
        </div>
        
        <div class="action-buttons">
          <button @click="downloadImage" class="action-button">下载图片</button>
          <button @click="copyToClipboard" class="action-button">复制到剪贴板</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 状态变量
const firstText = ref('Porn');
const secondText = ref('hub');
const fontSize = ref(40);
const imageWidth = ref(500);
const imageHeight = ref(150);
const borderRadius = ref(5);

// 方法
const generateImage = () => {
  // 图片生成逻辑已通过样式绑定实现
};

const downloadImage = () => {
  const image = document.querySelector('.pornhub-style-image') as HTMLElement;
  if (!image) return;
  
  const canvas = document.createElement('canvas');
  const width = imageWidth.value;
  const height = imageHeight.value;
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // 绘制背景
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, borderRadius.value);
  ctx.fill();
  
  // 计算文本位置
  ctx.font = `bold ${fontSize.value}px Arial, sans-serif`;
  const firstTextWidth = ctx.measureText(firstText.value).width;
  const secondTextWidth = ctx.measureText(secondText.value).width;
  const totalTextWidth = firstTextWidth + secondTextWidth;
  
  let startX = (width - totalTextWidth) / 2;
  if (startX < 20) startX = 20; // 最小左边距
  
  // 绘制第一部分文字
  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.fillText(firstText.value, startX, height / 2);
  
  // 绘制第二部分文字
  ctx.fillStyle = '#F90';
  ctx.fillText(secondText.value, startX + firstTextWidth, height / 2);
  
  // 下载图片
  const link = document.createElement('a');
  link.download = `pornhub-style-${firstText.value}${secondText.value}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

const copyToClipboard = async () => {
  const image = document.querySelector('.pornhub-style-image') as HTMLElement;
  if (!image) return;
  
  const canvas = document.createElement('canvas');
  const width = imageWidth.value;
  const height = imageHeight.value;
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // 绘制背景
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, borderRadius.value);
  ctx.fill();
  
  // 计算文本位置
  ctx.font = `bold ${fontSize.value}px Arial, sans-serif`;
  const firstTextWidth = ctx.measureText(firstText.value).width;
  const secondTextWidth = ctx.measureText(secondText.value).width;
  const totalTextWidth = firstTextWidth + secondTextWidth;
  
  let startX = (width - totalTextWidth) / 2;
  if (startX < 20) startX = 20; // 最小左边距
  
  // 绘制第一部分文字
  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.fillText(firstText.value, startX, height / 2);
  
  // 绘制第二部分文字
  ctx.fillStyle = '#F90';
  ctx.fillText(secondText.value, startX + firstTextWidth, height / 2);
  
  try {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/png');
    });
    
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
    
    alert('图片已复制到剪贴板');
  } catch (err) {
    console.error('复制到剪贴板失败:', err);
    alert('复制到剪贴板失败，请尝试下载图片');
  }
};

// 初始化
onMounted(() => {
  generateImage();
});
</script>

<style scoped>
.pornhub-style-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-wrapper {
  display: flex;
  gap: 40px;
  min-height: 500px;
}

.input-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preview-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
  color: #333;
}

.text-input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.size-slider {
  display: flex;
  align-items: center;
  gap: 10px;
}

.size-slider input {
  flex: 1;
}

.image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  min-width: 100%;
}

.pornhub-style-image {
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  user-select: none;
  padding: 0 20px;
  box-sizing: border-box;
}

.first-part {
  color: #FFFFFF;
  font-weight: bold;
}

.second-part {
  color: #F90;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.action-button {
  padding: 12px 24px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
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