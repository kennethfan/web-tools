<template>
  <div class="qrcode-scanner-container">
    <h1>二维码识别工具</h1>
    <div class="tool-wrapper">
      <!-- 左侧上传和摄像头区域 -->
      <div class="input-section">
        <div class="tabs">
          <button 
            :class="['tab-button', { active: activeTab === 'upload' }]"
            @click="activeTab = 'upload'"
          >
            上传图片
          </button>
          <button 
            :class="['tab-button', { active: activeTab === 'camera' }]"
            @click="activeTab = 'camera'; initCamera()"
          >
            摄像头扫描
          </button>
        </div>
        
        <div class="tab-content">
          <!-- 上传图片区域 -->
          <div v-if="activeTab === 'upload'" class="upload-area">
            <div 
              class="dropzone"
              @dragover.prevent
              @drop.prevent="onFileDrop"
              @click="triggerFileInput"
            >
              <input 
                type="file" 
                ref="fileInput" 
                accept="image/*" 
                style="display: none"
                @change="onFileSelected"
              >
              <div class="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p>点击或拖拽图片到此处</p>
            </div>
            
            <div v-if="selectedImage" class="preview-container">
              <img :src="selectedImage" alt="预览图片" class="image-preview">
              <button @click="scanQrCode" class="action-button">识别二维码</button>
            </div>
          </div>
          
          <!-- 摄像头区域 -->
          <div v-if="activeTab === 'camera'" class="camera-area">
            <video 
              ref="videoElement" 
              class="camera-preview"
              autoplay 
              playsinline
            ></video>
            <div class="camera-controls">
              <button @click="captureFrame" class="action-button">扫描二维码</button>
              <button @click="stopCamera" class="action-button secondary">关闭摄像头</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧结果区域 -->
      <div class="result-section">
        <div class="result-header">识别结果</div>
        <div v-if="isLoading" class="loading">
          <div class="spinner"></div>
          <p>正在识别中...</p>
        </div>
        <div v-else-if="scanResult" class="result-content">
          <textarea 
            v-model="scanResult" 
            class="result-textarea" 
            readonly
          ></textarea>
          <div class="result-actions">
            <button @click="copyResult" class="action-button">复制结果</button>
            <button v-if="isUrl(scanResult)" @click="openUrl" class="action-button">打开链接</button>
          </div>
        </div>
        <div v-else class="empty-result">
          <p>请上传图片或使用摄像头扫描二维码</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
import jsQR from 'jsqr';

// 状态变量
const activeTab = ref('upload');
const fileInput = ref<HTMLInputElement | null>(null);
const videoElement = ref<HTMLVideoElement | null>(null);
const selectedImage = ref<string | null>(null);
const scanResult = ref<string>('');
const isLoading = ref<boolean>(false);
let stream: MediaStream | null = null;

// 触发文件选择
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// 文件拖放处理
const onFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files.length) {
    handleFile(event.dataTransfer.files[0]);
  }
};

// 文件选择处理
const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    handleFile(target.files[0]);
  }
};

// 处理选择的文件
const handleFile = (file: File) => {
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    scanResult.value = ''; // 清空之前的结果
  }
};

// 初始化摄像头
const initCamera = async () => {
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoElement.value) {
        videoElement.value.srcObject = stream;
      }
    }
  } catch (error) {
    console.error('摄像头访问失败:', error);
    alert('无法访问摄像头，请检查权限设置或尝试使用图片上传。');
    activeTab.value = 'upload';
  }
};

// 停止摄像头
const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
    if (videoElement.value) {
      videoElement.value.srcObject = null;
    }
  }
};

// 从图片中扫描二维码
const scanQrCode = async () => {
  if (!selectedImage.value) return;
  
  isLoading.value = true;
  scanResult.value = '';
  
  try {
    const img = new Image();
    img.src = selectedImage.value;
    
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('无法创建Canvas上下文');
    }
    
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    
    if (code) {
      scanResult.value = code.data;
    } else {
      alert('未能识别到二维码，请尝试使用清晰的二维码图片。');
    }
  } catch (error) {
    console.error('二维码识别失败:', error);
    alert('二维码识别失败，请重试。');
  } finally {
    isLoading.value = false;
  }
};

// 从摄像头捕获帧并扫描
const captureFrame = () => {
  if (!videoElement.value || !videoElement.value.srcObject) {
    alert('摄像头未启动，请先启动摄像头。');
    return;
  }
  
  isLoading.value = true;
  scanResult.value = '';
  
  try {
    const canvas = document.createElement('canvas');
    const video = videoElement.value;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('无法创建Canvas上下文');
    }
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    
    if (code) {
      scanResult.value = code.data;
    } else {
      alert('未能识别到二维码，请调整摄像头位置或尝试使用图片上传。');
    }
  } catch (error) {
    console.error('二维码识别失败:', error);
    alert('二维码识别失败，请重试。');
  } finally {
    isLoading.value = false;
  }
};

// 复制结果到剪贴板
const copyResult = () => {
  if (!scanResult.value) return;
  
  navigator.clipboard.writeText(scanResult.value)
    .then(() => {
      alert('已复制到剪贴板');
    })
    .catch(err => {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制。');
    });
};

// 检查是否为URL
const isUrl = (text: string): boolean => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

// 打开URL
const openUrl = () => {
  if (isUrl(scanResult.value)) {
    window.open(scanResult.value, '_blank');
  }
};

// 组件卸载时清理资源
onUnmounted(() => {
  stopCamera();
});
</script>

<style scoped>
.qrcode-scanner-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-wrapper {
  display: flex;
  gap: 20px;
  min-height: 70vh;
}

.input-section, .result-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-button {
  padding: 10px 20px;
  background-color: #f4f4f4;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-button.active {
  background-color: #007BFF;
  color: white;
}

.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.upload-area, .camera-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dropzone {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  cursor: pointer;
  transition: all 0.3s;
}

.dropzone:hover {
  border-color: #007BFF;
  background-color: rgba(0, 123, 255, 0.05);
}

.upload-icon {
  color: #007BFF;
  margin-bottom: 15px;
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.image-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.camera-preview {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #000;
}

.camera-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.result-section {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.result-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
}

.result-textarea {
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  resize: none;
  background-color: white;
}

.result-actions {
  display: flex;
  gap: 10px;
}

.empty-result {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  border-top-color: #007BFF;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

.action-button.secondary {
  background-color: #6c757d;
}

.action-button.secondary:hover {
  background-color: #5a6268;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
</style>