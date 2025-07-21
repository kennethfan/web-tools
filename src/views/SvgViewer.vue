<template>
  <div class="svg-viewer-container">
    <h1>SVG 展示与转换工具</h1>
    <div class="tool-wrapper">
      <div class="input-section">
        <div class="form-group">
          <label>SVG 来源</label>
          <div class="source-tabs">
            <button 
              :class="['tab-button', { active: activeTab === 'upload' }]" 
              @click="activeTab = 'upload'"
            >
              上传文件
            </button>
            <button 
              :class="['tab-button', { active: activeTab === 'code' }]" 
              @click="activeTab = 'code'"
            >
              SVG 代码
            </button>
          </div>
          
          <div v-if="activeTab === 'upload'" class="upload-area">
            <input 
              type="file" 
              id="svg-file" 
              accept=".svg,image/svg+xml" 
              @change="handleFileUpload"
              ref="fileInput"
              style="display: none"
            />
            <div 
              class="drop-zone" 
              @click="triggerFileInput"
              @dragover.prevent="dragover = true"
              @dragleave.prevent="dragover = false"
              @drop.prevent="handleFileDrop"
              :class="{ 'dragover': dragover }"
            >
              <div v-if="!svgContent">
                <div class="upload-icon">📁</div>
                <p>点击或拖拽 SVG 文件到此处</p>
              </div>
              <div v-else class="file-info">
                <p>{{ fileName }}</p>
                <button class="small-button" @click.stop="clearFile">清除</button>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'code'" class="code-input-area">
            <div class="input-wrapper">
              <textarea 
                v-model="svgCode" 
                placeholder="粘贴 SVG 代码" 
                class="text-input code-input"
              ></textarea>
              <button class="action-button" @click="loadFromCode">加载</button>
            </div>
          </div>
        </div>
        
        <div class="form-group" v-if="svgContent">
          <label>导出设置</label>
          
          <div class="export-options">
            <div class="option-group">
              <label>导出格式</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="exportFormat" value="png">
                  <span>PNG</span>
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="exportFormat" value="jpeg">
                  <span>JPEG</span>
                </label>
              </div>
            </div>
            
            <div class="option-group">
              <label>图片质量 (仅 JPEG)</label>
              <div class="size-slider">
                <input 
                  type="range" 
                  v-model="jpegQuality" 
                  min="0.1" 
                  max="1.0" 
                  step="0.1"
                  :disabled="exportFormat !== 'jpeg'"
                />
                <span>{{ Math.round(jpegQuality * 100) }}%</span>
              </div>
            </div>
            
            <div class="option-group">
              <label>缩放比例</label>
              <div class="size-slider">
                <input 
                  type="range" 
                  v-model="scale" 
                  min="0.5" 
                  max="3" 
                  step="0.1"
                />
                <span>{{ scale }}x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="preview-section">
        <div class="svg-preview" v-if="svgContent">
          <div class="svg-container" ref="svgContainer" v-html="svgContent"></div>
        </div>
        <div class="placeholder" v-else>
          <p>SVG 预览区域</p>
          <p class="sub-text">上传 SVG 文件或输入 URL 地址后在此处显示</p>
        </div>
        
        <div class="action-buttons" v-if="svgContent">
          <button @click="exportImage" class="action-button">导出为 {{ exportFormat.toUpperCase() }}</button>
          <button @click="copyToClipboard" class="action-button">复制到剪贴板</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 状态变量
const activeTab = ref('upload');
const svgContent = ref('');
const svgCode = ref('');
const svgLoaded = ref(false);
const fileName = ref('');
const dragover = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const svgContainer = ref<HTMLElement | null>(null);

// 导出设置
const exportFormat = ref('png');
const jpegQuality = ref(0.8);
const scale = ref(1.0);

// 方法
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
      fileName.value = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          svgContent.value = e.target.result as string;
          svgLoaded.value = true;
        }
      };
      reader.readAsText(file);
    } else {
      alert('请上传 SVG 格式的文件');
    }
  }
};

const handleFileDrop = (event: DragEvent) => {
  dragover.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
      fileName.value = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          svgContent.value = e.target.result as string;
          svgLoaded.value = true;
        }
      };
      reader.readAsText(file);
    } else {
      alert('请上传 SVG 格式的文件');
    }
  }
};

const clearFile = () => {
  svgContent.value = '';
  fileName.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  svgLoaded.value = false;
};



// 从 SVG 代码加载
const loadFromCode = () => {
  if (!svgCode.value) {
    alert('请输入 SVG 代码');
    return;
  }
  
  try {
    // 验证输入的是否是有效的 SVG 代码
    if (!svgCode.value.includes('<svg') && !svgCode.value.includes('<?xml')) {
      alert('请输入有效的 SVG 代码');
      return;
    }
    
    svgContent.value = svgCode.value;
    svgLoaded.value = true;
    fileName.value = 'svg-from-code.svg';
  } catch (error) {
    console.error('加载 SVG 代码失败:', error);
    alert('加载 SVG 代码失败，请检查代码格式是否正确');
  }
};

const exportImage = () => {
  if (!svgContainer.value) return;
  
  const svgElement = svgContainer.value.querySelector('svg');
  if (!svgElement) {
    alert('未找到有效的 SVG 元素');
    return;
  }
  
  // 创建一个临时的 SVG 元素用于导出
  const tempSvg = svgElement.cloneNode(true) as SVGElement;
  
  // 获取 SVG 的尺寸
  const svgWidth = svgElement.width.baseVal.value || parseInt(svgElement.getAttribute('width') || '0', 10) || svgElement.viewBox.baseVal.width;
  const svgHeight = svgElement.height.baseVal.value || parseInt(svgElement.getAttribute('height') || '0', 10) || svgElement.viewBox.baseVal.height;
  
  if (!svgWidth || !svgHeight) {
    alert('无法确定 SVG 尺寸');
    return;
  }
  
  // 创建 Canvas
  const canvas = document.createElement('canvas');
  canvas.width = svgWidth * scale.value;
  canvas.height = svgHeight * scale.value;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    alert('无法创建 Canvas 上下文');
    return;
  }
  
  // 将 SVG 转换为 Data URL
  const svgData = new XMLSerializer().serializeToString(tempSvg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  // 创建图片并绘制到 Canvas
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    
    // 导出为指定格式
    let exportUrl;
    if (exportFormat.value === 'jpeg') {
      exportUrl = canvas.toDataURL('image/jpeg', jpegQuality.value);
    } else {
      exportUrl = canvas.toDataURL('image/png');
    }
    
    // 下载图片
    const link = document.createElement('a');
    link.download = `${fileName.value.replace('.svg', '')}.${exportFormat.value}`;
    link.href = exportUrl;
    link.click();
  };
  img.src = url;
};

const copyToClipboard = async () => {
  if (!svgContainer.value) return;
  
  const svgElement = svgContainer.value.querySelector('svg');
  if (!svgElement) {
    alert('未找到有效的 SVG 元素');
    return;
  }
  
  // 创建一个临时的 SVG 元素用于导出
  const tempSvg = svgElement.cloneNode(true) as SVGElement;
  
  // 获取 SVG 的尺寸
  const svgWidth = svgElement.width.baseVal.value || parseInt(svgElement.getAttribute('width') || '0', 10) || svgElement.viewBox.baseVal.width;
  const svgHeight = svgElement.height.baseVal.value || parseInt(svgElement.getAttribute('height') || '0', 10) || svgElement.viewBox.baseVal.height;
  
  if (!svgWidth || !svgHeight) {
    alert('无法确定 SVG 尺寸');
    return;
  }
  
  // 创建 Canvas
  const canvas = document.createElement('canvas');
  canvas.width = svgWidth * scale.value;
  canvas.height = svgHeight * scale.value;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    alert('无法创建 Canvas 上下文');
    return;
  }
  
  // 将 SVG 转换为 Data URL
  const svgData = new XMLSerializer().serializeToString(tempSvg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  // 创建图片并绘制到 Canvas
  const img = new Image();
  img.onload = async () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    
    try {
      // 导出为指定格式
      const mimeType = exportFormat.value === 'jpeg' ? 'image/jpeg' : 'image/png';
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, mimeType, exportFormat.value === 'jpeg' ? jpegQuality.value : undefined);
      });
      
      await navigator.clipboard.write([
        new ClipboardItem({ [mimeType]: blob })
      ]);
      
      alert('图片已复制到剪贴板');
    } catch (err) {
      console.error('复制到剪贴板失败:', err);
      alert('复制到剪贴板失败，请尝试下载图片');
    }
  };
  img.src = url;
};

// 初始化
onMounted(() => {
  // 初始化代码
});
</script>

<style scoped>
.svg-viewer-container {
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

.code-input {
  min-height: 150px;
  font-family: monospace;
  white-space: pre;
  resize: vertical;
}

.source-tabs {
  display: flex;
  margin-bottom: 15px;
}

.tab-button {
  flex: 1;
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tab-button.active {
  background-color: #4CAF50;
  color: white;
  border-bottom: 1px solid #4CAF50;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
}

.tab-button:first-child {
  border-radius: 6px 0 0 6px;
}

.tab-button:last-child {
  border-radius: 0 6px 6px 0;
}

.tab-button.active {
  background-color: #007BFF;
  color: white;
  border-color: #007BFF;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 6px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.drop-zone:hover, .drop-zone.dragover {
  border-color: #007BFF;
  background-color: rgba(0, 123, 255, 0.05);
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.file-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.small-button {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.code-input-area {
  display: flex;
  gap: 10px;
}

.code-input-area .text-input {
  flex: 1;
}

.export-options {
  background-color: #f9f9f9;
  border-radius: 6px;
  padding: 15px;
}

.option-group {
  margin-bottom: 15px;
}

.option-group:last-child {
  margin-bottom: 0;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.size-slider {
  display: flex;
  align-items: center;
  gap: 10px;
}

.size-slider input {
  flex: 1;
}

.svg-preview {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.svg-container {
  max-width: 100%;
  max-height: 100%;
}

.svg-container svg {
  max-width: 100%;
  max-height: 100%;
}

.placeholder {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  color: #999;
}

.sub-text {
  font-size: 14px;
  margin-top: 5px;
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