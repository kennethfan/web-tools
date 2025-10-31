<template>
  <div class="ai-navigation-container">
    <h1 class="section-title">AI 工具导航</h1>
    <div class="ai-tools-grid">
      <div class="ai-tool-card">
        <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer">
          <h3>ChatGPT</h3>
          <p>OpenAI开发的先进对话AI模型，支持自然语言理解和生成</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">
          <h3>Gemini</h3>
          <p>Google开发的多模态AI模型，支持文本、图像和代码处理</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://tongyi.aliyun.com/" target="_blank" rel="noopener noreferrer">
          <h3>通义千问</h3>
          <p>阿里巴巴开发的大型语言模型，提供自然语言处理和对话能力</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://www.doubao.com/" target="_blank" rel="noopener noreferrer">
          <h3>豆包</h3>
          <p>字节跳动推出的AI助手，提供对话和创作功能</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://yuanbao.tencent.com/" target="_blank" rel="noopener noreferrer">
          <h3>元宝</h3>
          <p>腾讯元宝可以帮你写作绘画文案翻译编程搜索阅读总结的全能助手</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://chat.deepseek.com/" target="_blank" rel="noopener noreferrer">
          <h3>DeepSeek</h3>
          <p>专注于代码和文本生成的AI模型，提供强大的编程辅助功能</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://kimi.com/" target="_blank" rel="noopener noreferrer">
          <h3>Kimi</h3>
          <p>Kimi K2擅长推理、编程和调用工具,帮助你高效解决复杂问题。</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://grok.com/" target="_blank" rel="noopener noreferrer">
          <h3>grok</h3>
          <p>Grok是由马斯克旗下xAI公司开发的人工智能大模型。</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://jimeng.jianying.com/" target="_blank" rel="noopener noreferrer">
          <h3>即梦</h3>
          <p>即梦AI，将抽象的思路转化为视觉作品。</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://www.coze.cn/" target="_blank" rel="noopener noreferrer">
          <h3>扣子</h3>
          <p>扣子空间是你和 AI Agent 协同办公的最佳场所。</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://www.yileai.cn/" target="_blank" rel="noopener noreferrer">
          <h3>移乐AI</h3>
          <p>图片视频处理工具</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer">
          <h3>perplexity</h3>
          <p>回答带来源的AI</p>
        </a>
      </div>
      <div class="ai-tool-card">
        <a href="https://yiyan.baidu.com/" target="_blank" rel="noopener noreferrer">
          <h3>文心一言</h3>
          <p>百度推出的人工智能语言模型，支持多种自然语言处理任务</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// AI导航页面逻辑
</script>

<style scoped>
.ai-navigation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #007BFF;
}

.ai-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.ai-tool-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.ai-tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}

.ai-tool-card a {
  display: block;
  padding: 25px;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.ai-tool-card h3 {
  font-size: 20px;
  color: #28a745;
  margin-top: 0;
  margin-bottom: 15px;
}

.ai-tool-card p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .ai-tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
