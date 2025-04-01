<template>
  <div class="rmb-container">
    <h1>人民币大小写转换</h1>
    <div class="tool-wrapper">
      <textarea
        v-model="inputText"
        placeholder="输入金额（如：123.45）"
        class="textarea"
      ></textarea>

      <div class="button-group">
        <button @click="convertToChinese" class="action-button">
          转大写 →
        </button>
        <button @click="convertToNumber" class="action-button">← 转数字</button>
      </div>

      <textarea
        v-model="outputText"
        placeholder="大写金额（如：壹佰贰拾叁元肆角伍分）"
        class="textarea"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const inputText = ref("");
const outputText = ref("");

const chineseNumbers = [
  "零",
  "壹",
  "贰",
  "叁",
  "肆",
  "伍",
  "陆",
  "柒",
  "捌",
  "玖",
];
const chineseUnits = ["", "拾", "佰", "仟"];
const chineseBigUnits = ["", "万", "亿"];

// 数字转大写
const convertToChinese = () => {
  try {
    const num = parseFloat(inputText.value);
    if (isNaN(num)) throw new Error("无效数字");
    if (num >= 1e12) throw new Error("数字过大");

    let result = convertIntegerPart(Math.floor(num));
    const decimal = Math.round((num - Math.floor(num)) * 100);

    if (decimal > 0) {
      result += convertDecimalPart(decimal);
    } else {
      result += "整";
    }

    outputText.value = result;
  } catch (error) {
    outputText.value = error instanceof Error ? error.message : "转换失败";
  }
};

// 大写转数字
const convertToNumber = () => {
  try {
    const chinese = outputText.value.trim();
    if (!chinese) throw new Error("请输入大写金额");

    const num = parseChineseToNumber(chinese);
    inputText.value = num.toString();
  } catch (error) {
    inputText.value = error instanceof Error ? error.message : "转换失败";
  }
};

// 转换整数部分
const convertIntegerPart = (num: number): string => {
  if (num === 0) return "零";

  // 拆分亿、万、个位部分
  const yi = Math.floor(num / 1e8);
  const wan = Math.floor((num % 1e8) / 1e4);
  const ge = num % 1e4;

  let result = "";

  // 转换亿部分
  if (yi > 0) {
    result += convertFourDigits(yi) + "亿";
  }

  // 转换万部分
  if (wan > 0) {
    result += convertFourDigits(wan) + "万";
  } else if (yi > 0 && ge > 0) {
    result += "零"; // 亿和个位之间有零
  }

  // 转换个位部分
  if (ge > 0) {
    result += convertFourDigits(ge);
  }

  // 去除多余的零
  result = result.replace(/零+$/, "");
  return result + "元";
};

// 转换四位数
const convertFourDigits = (num: number): string => {
  if (num === 0) return "";

  let result = "";
  const digits = [
    Math.floor(num / 1000), // 千
    Math.floor((num % 1000) / 100), // 百
    Math.floor((num % 100) / 10), // 十
    num % 10, // 个
  ];

  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    if (digit === 0) {
      if (result.length > 0 && !result.endsWith("零")) {
        result += "零";
      }
    } else {
      result += chineseNumbers[digit] + chineseUnits[3 - i];
    }
  }

  return result;
};

// 转换小数部分
const convertDecimalPart = (decimal: number): string => {
  let result = "";

  // 角
  const jiao = Math.floor(decimal / 10);
  if (jiao > 0) {
    result += chineseNumbers[jiao] + "角";
  }

  // 分
  const fen = decimal % 10;
  if (fen > 0) {
    result += chineseNumbers[fen] + "分";
  }

  return result;
};

const chineseMap: { [key: string]: number } = {
  零: 0,
  壹: 1,
  贰: 2,
  叁: 3,
  肆: 4,
  伍: 5,
  陆: 6,
  柒: 7,
  捌: 8,
  玖: 9,
  拾: 10,
  佰: 100,
  仟: 1000,
  万: 10000,
  亿: 100000000,
};
// 大写转数字
const parseChineseToNumber = (chinese: string): number => {
  // 拆分元、角、分部分
  const yuanIndex = chinese.indexOf("元");
  const jiaoIndex = chinese.indexOf("角");
  const fenIndex = chinese.indexOf("分");

  // 处理元部分
  let yuanPart = "";
  if (yuanIndex !== -1) {
    yuanPart = chinese.substring(0, yuanIndex);
  }

  // 处理角部分
  let jiaoPart = "";
  if (jiaoIndex !== -1) {
    jiaoPart = chinese.substring(yuanIndex + 1, jiaoIndex);
  }

  // 处理分部分
  let fenPart = "";
  if (fenIndex !== -1) {
    fenPart = chinese.substring(jiaoIndex + 1, fenIndex);
  }

  // 计算元部分
  const yuanValue = parseYuanPart(yuanPart);

  // 计算角部分
  const jiaoValue = parseDecimalPart(jiaoPart) / 10;

  // 计算分部分
  const fenValue = parseDecimalPart(fenPart) / 100;

  return yuanValue + jiaoValue + fenValue;
};

// 解析元部分
const parseYuanPart = (yuanPart: string): number => {
  if (!yuanPart) return 0;

  // 拆分亿、万部分
  const yiIndex = yuanPart.indexOf("亿");
  const wanIndex = yuanPart.indexOf("万");

  let yiPart = "";
  let wanPart = "";
  let gePart = "";

  if (yiIndex !== -1) {
    yiPart = yuanPart.substring(0, yiIndex);
    if (wanIndex !== -1) {
      wanPart = yuanPart.substring(yiIndex + 1, wanIndex);
      gePart = yuanPart.substring(wanIndex + 1);
    } else {
      gePart = yuanPart.substring(yiIndex + 1);
    }
  } else if (wanIndex !== -1) {
    wanPart = yuanPart.substring(0, wanIndex);
    gePart = yuanPart.substring(wanIndex + 1);
  } else {
    gePart = yuanPart;
  }

  // 计算各部分值
  const yiValue = parseFourDigits(yiPart) * 1e8;
  const wanValue = parseFourDigits(wanPart) * 1e4;
  const geValue = parseFourDigits(gePart);

  return yiValue + wanValue + geValue;
};

// 解析四位数
const parseFourDigits = (part: string): number => {
  if (!part) return 0;

  let current = 0;
  let previous = 0;

  for (const char of part) {
    const value = chineseMap[char];
    if (value === undefined) continue;

    if (value >= 10) {
      current += previous * value;
      previous = 0;
    } else {
      previous = value;
    }
  }

  return current + previous;
};

// 解析小数部分
const parseDecimalPart = (part: string): number => {
  if (!part) return 0;

  let result = 0;
  for (const char of part) {
    const value = chineseMap[char];
    if (value !== undefined && value < 10) {
      result = result * 10 + value;
    }
  }
  return result;
};
</script>

<style scoped>
/* 复用现有样式 */
.rmb-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-wrapper {
  display: flex;
  gap: 20px;
  height: 500px;
}

.textarea {
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  resize: none;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.action-button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>
