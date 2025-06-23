<script setup lang="ts">

const props = defineProps({
  id: String,
  title: String,
  text: String,
  image: String,
  opacity: String
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

function onClick() {
  emit('click')
}

</script>
<template>
  <div class="item">
    <el-card shadow='hover' @click="onClick">
      <el-image :src="image" :style="{'width': '125px', 'height': '125px', 'opacity': opacity}"></el-image>
      <h3>{{ title }}</h3>
      <div><slot name="text"></slot></div>
    </el-card>
  </div>
</template>

<style scoped>
.item {
  margin: 0.5rem;
  display: flex;
  position: relative;
  border: 0px solid #b4b2b2;
  padding: 4px;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 400;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  color: var(--color-heading);
}

.el-card {
  cursor: pointer;
}

</style>
