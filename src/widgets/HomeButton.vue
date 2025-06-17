<script setup lang="ts">
import { House } from '@element-plus/icons-vue'
</script>

<template>
  <div style="width: 36px">
    <router-link to="/" v-slot="{ navigate }" custom>
      <el-button :icon="House" @click="navigate" style="width: inherit"></el-button>
    </router-link>
  </div>
</template>
