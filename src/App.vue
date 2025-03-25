<template>
  <div id="app">
    <h1>Web 工具集</h1>
    <NavigationMenu />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import NavigationMenu from './components/NavigationMenu.vue';
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}
</style>
