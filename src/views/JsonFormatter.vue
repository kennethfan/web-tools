<template>
  <div>
    <h2>JSON 格式化</h2>
    <textarea v-model="inputJson" placeholder="请输入 JSON 数据"></textarea>
    <button @click="formatJson">格式化</button>
    <pre v-if="formattedJson">{{ formattedJson }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 存储用户输入的 JSON 数据
const inputJson = ref('');
// 存储格式化后的 JSON 数据
const formattedJson = ref('');

const formatJson = () => {
  try {
    // 解析用户输入的 JSON 数据
    const parsed = JSON.parse(inputJson.value);
    // 将解析后的数据进行格式化，缩进为 2 个空格
    formattedJson.value = JSON.stringify(parsed, null, 2);
  } catch (error) {
    // 若输入的 JSON 数据格式有误，给出错误提示
    formattedJson.value = '输入的 JSON 数据格式有误';
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  margin-bottom: 10px;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ccc;
  white-space: pre-wrap;
}
</style>