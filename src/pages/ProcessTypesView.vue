<script setup lang="ts">
import ClickableInfoCard from '@/widgets/ClickableInfoCard.vue'
import imagePlaceholder from '@/shared/assets/image-placeholder.png'
</script>

<template>
  <div class="main-layout">
    <h3>Load 3D model</h3>
    <br />
    <div class="cards-layout">
      <ClickableInfoCard title="View sample" :image="imagePlaceholder" opacity="30%" id="0"/>
      <ClickableInfoCard title="Upload GLTF file" :image="imagePlaceholder" opacity="30%" id="1"/>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: block;
  text-align: center;
}
.cards-layout {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}
</style>
