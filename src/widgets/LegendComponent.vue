<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { type LegendElement } from '@/shared/types/LegendElement'

defineProps({
  elements: Array<LegendElement>
})

const model: Ref<Array<string>> = ref(['1'])
const emit = defineEmits<{
  (e: 'change', element: LegendElement): void
}>()

function onItemChange(value: LegendElement) {
  emit('change', value)
}
</script>
<template>
  <el-collapse v-model='model' class="viewer-component" style="min-width: 170px">
    <el-collapse-item style="background: none" title="Feature filter" name="1">
      <div class="legend-layout">
        <template v-for="elem in elements" :key="elem.typeId">
          <div class="color" :style="{ 'background-color': elem.color.toString(), 'opacity': '0.7' }"></div>
          {{ elem.label }}
          <el-switch v-model="elem.enabled" @change="onItemChange(elem)" />
        </template>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<style scoped>
.legend-layout {
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto;
  gap: 4px;
  .layout-item {
    margin-left: 0;
  }
  .color {
    width: 1em;
    height: 1em;
    border-radius: 0.5em;
  }
}
</style>
