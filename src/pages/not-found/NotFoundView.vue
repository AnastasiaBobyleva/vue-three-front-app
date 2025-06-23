<script setup lang="ts">
import HomeButton from '@/shared/ui/HomeButton.vue'
</script>

<template>
  <div class="main-layout">
    <h3>Error 404: page not found. Try to start with home page.</h3>
    <HomeButton></HomeButton>
  </div>
</template>
<style scoped>
.main-layout {
  height: 90vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>
