<template>
  <div class="avatar-container">
    <h1>姓名头像生成工具</h1>
    <div class="tool-wrapper">
      <div class="input-section">
        <div class="form-group">
          <label for="name-input">姓名</label>
          <input 
            id="name-input"
            v-model="name" 
            placeholder="请输入姓名"
            class="text-input"
            @input="generateAvatar"
          />
        </div>
        
        <div class="form-group">
          <label>背景颜色</label>
          <div class="color-options">
            <div 
              v-for="(color, index) in backgroundColors" 
              :key="index"
              :style="{ backgroundColor: color }"
              :class="['color-option', { active: selectedColorIndex === index }]"
              @click="selectColor(index)"
            ></div>
          </div>
        </div>
        
        <div class="form-group">
          <label>字体颜色</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="textColor" value="#FFFFFF" @change="generateAvatar">
              <span>白色</span>
            </label>
            <label class="radio-label">
              <input type="radio" v-model="textColor" value="#000000" @change="generateAvatar">
              <span>黑色</span>
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label>头像大小</label>
          <div class="size-slider">
            <input 
              type="range" 
              v-model="avatarSize" 
              min="100" 
              max="300" 
              step="10"
              @input="generateAvatar"
            />
            <span>{{ avatarSize }}px</span>
          </div>
        </div>
      </div>
      
      <div class="preview-section">
        <div class="avatar-preview">
          <div 
            class="avatar" 
            :style="{
              backgroundColor: backgroundColors[selectedColorIndex],
              color: textColor,
              width: `${avatarSize}px`,
              height: `${avatarSize}px`,
              fontSize: `${avatarSize * 0.4}px`,
              lineHeight: `${avatarSize}px`
            }"
          >
            {{ displayText }}
          </div>
        </div>
        
        <div class="action-buttons">
          <button @click="downloadAvatar" class="action-button">下载头像</button>
          <button @click="copyToClipboard" class="action-button">复制到剪贴板</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

// 状态变量
const name = ref('');
const backgroundColors = [
  '#1890FF', '#52C41A', '#FAAD14', '#F5222D', '#722ED1',
  '#13C2C2', '#EB2F96', '#FA8C16', '#A0D911', '#2F54EB'
];
const selectedColorIndex = ref(0);
const textColor = ref('#FFFFFF');
const avatarSize = ref(200);

// 计算属性：显示的文本
const displayText = computed(() => {
  if (!name.value) return '';
  
  // 处理中文名字
  if (/[\u4e00-\u9fa5]/.test(name.value)) {
    // 如果是中文名，取最后两个字
    return name.value.length > 2 
      ? name.value.substring(name.value.length - 2) 
      : name.value;
  } else {
    // 如果是英文名，取首字母
    return name.value.split(' ')
      .filter(part => part.length > 0)
      .map(part => part[0].toUpperCase())
      .join('')
      .substring(0, 2);
  }
});

// 方法
const selectColor = (index: number) => {
  selectedColorIndex.value = index;
  generateAvatar();
};

const generateAvatar = () => {
  // 头像生成逻辑已通过计算属性和样式绑定实现
};

const downloadAvatar = () => {
  const avatar = document.querySelector('.avatar') as HTMLElement;
  if (!avatar) return;
  
  const canvas = document.createElement('canvas');
  const size = avatarSize.value;
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // 绘制背景
  ctx.fillStyle = backgroundColors[selectedColorIndex.value];
  ctx.fillRect(0, 0, size, size);
  
  // 绘制文字
  ctx.fillStyle = textColor.value;
  ctx.font = `bold ${size * 0.4}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayText.value, size / 2, size / 2);
  
  // 下载图片
  const link = document.createElement('a');
  link.download = `avatar-${name.value}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

const copyToClipboard = async () => {
  const avatar = document.querySelector('.avatar') as HTMLElement;
  if (!avatar) return;
  
  const canvas = document.createElement('canvas');
  const size = avatarSize.value;
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // 绘制背景
  ctx.fillStyle = backgroundColors[selectedColorIndex.value];
  ctx.fillRect(0, 0, size, size);
  
  // 绘制文字
  ctx.fillStyle = textColor.value;
  ctx.font = `bold ${size * 0.4}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayText.value, size / 2, size / 2);
  
  try {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/png');
    });
    
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
    
    alert('头像已复制到剪贴板');
  } catch (err) {
    console.error('复制到剪贴板失败:', err);
    alert('复制到剪贴板失败，请尝试下载图片');
  }
};

// 初始化时随机选择一个颜色
onMounted(() => {
  selectedColorIndex.value = Math.floor(Math.random() * backgroundColors.length);
});
</script>

<style scoped>
.avatar-container {
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

.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #333;
  transform: scale(1.1);
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

.avatar-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.avatar {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  user-select: none;
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