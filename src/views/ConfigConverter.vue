<template>
  <div class="config-converter-container">
    <h1>配置文件互转</h1>
    <div class="tool-wrapper">
      <div class="input-section">
        <textarea v-model="inputContent" placeholder="请输入配置文件内容"></textarea>
        <select v-model="inputFormat">
          <option value="json">JSON</option>
          <option value="yaml">YAML</option>
          <option value="properties">Properties</option>
        </select>
      </div>
      
      <div class="button-group">
        <button @click="convert">转换</button>
      </div>

      <div class="output-section">
        <textarea v-model="outputContent" readonly></textarea>
        <select v-model="outputFormat">
          <option value="json">JSON</option>
          <option value="yaml">YAML</option>
          <option value="properties">Properties</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { parse, stringify } from 'yaml';

const inputContent = ref('');
const outputContent = ref('');
const inputFormat = ref('json');
const outputFormat = ref('yaml');

const convertPropertiesToString = (obj: Record<string, any>, prefix = '') => {
  return Object.entries(obj)
    .map(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        return convertPropertiesToString(value, fullKey);
      }
      return `${fullKey}=${value}`;
    })
    .join('\n');
};

const parseProperties = (input: string) => {
  const result: Record<string, any> = {};
  input.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value !== undefined) {
        const keys = key.trim().split('.');
        let current = result;
        for (let i = 0; i < keys.length - 1; i++) {
          const k = keys[i];
          if (!current[k]) {
            current[k] = {};
          }
          current = current[k];
        }
        current[keys[keys.length - 1]] = value.trim();
      }
    }
  });
  return result;
};

const stringifyProperties = (obj: Record<string, any>, prefix = '') => {
  return Object.entries(obj)
    .map(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        return stringifyProperties(value, fullKey);
      }
      return `${fullKey}=${value}`;
    })
    .join('\n');
};

const convert = () => {
  try {
    let intermediate;
    switch (inputFormat.value) {
      case 'json':
        intermediate = JSON.parse(inputContent.value);
        break;
      case 'yaml':
        intermediate = parse(inputContent.value);
        break;
      case 'properties':
        intermediate = parseProperties(inputContent.value);
        break;
    }

    switch (outputFormat.value) {
      case 'json':
        outputContent.value = JSON.stringify(intermediate, null, 2);
        break;
      case 'yaml':
        outputContent.value = stringify(intermediate);
        break;
      case 'properties':
        outputContent.value = convertPropertiesToString(intermediate);
        break;
    }
  } catch (error) {
    outputContent.value = '❌ 转换失败：' + error.message;
  }
};
</script>

<style scoped>
.config-converter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-wrapper {
  display: flex;
  gap: 20px;
  height: 500px;
}

.input-section,
.output-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
  resize: none;
}

select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>