<script setup lang="ts">
import HomeButton from '@/shared/ui/HomeButton.vue'

const props = defineProps({
  modelName: String,
  type: String
})

const text =
  props.modelName + ' is loading. Please do not close or reload page until loading is finished...'
</script>

<template>
  <div class="main-layout">
    <div class="header">
      <HomeButton></HomeButton>
      <h3>{{ type }}</h3>
    </div>
    <el-row style="width: 100%; height: 30vh; align-items: center; justify-content: center">
      <div class="loader"></div>
    </el-row>
    <el-row style="justify-content: center">
      <el-text style="text-align: center">{{ text }}</el-text>
    </el-row>
  </div>
</template>

<style scoped>
  .header {
    display: grid;
    grid-gap: 20px;
    justify-content: left;
    grid-template-columns: repeat(3, calc(33.33% - 20px));
  }

.main-layout {
  z-index: 2000;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 16px;
  display: block;
  text-align: center;
  background: rgba(248, 248, 248, 0.8);

  .item {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: calc(33.33% - 20px);
  }
}

.loader {
  width: 40px;
  height: 40px;
  aspect-ratio: 1;
  display: grid;
}
.loader::before,
.loader::after {
  content: '';
  grid-area: 1/1;
  background: var(--el-color-primary);
  clip-path: polygon(0 0, 101% 0, 0 100%);
  animation: l13 2s infinite;
}
.loader::after {
  --s: -1, -1;
}
@keyframes l13 {
  0%,
  10% {
    transform: scale(var(--s, 1)) translate(0, 0) rotate(0deg);
  }
  33% {
    transform: scale(var(--s, 1)) translate(20px, -20px) rotate(0deg);
  }
  66% {
    transform: scale(var(--s, 1)) translate(20px, -20px) rotate(180deg);
  }
  90%,
  100% {
    transform: scale(var(--s, 1)) translate(0px, 0px) rotate(180deg);
  }
}
</style>
