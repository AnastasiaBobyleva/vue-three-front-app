<script setup lang="ts">
import { type Ref, ref } from 'vue'

interface FilterItem {
  name: string
  active: boolean
}

const props = defineProps({
  items: Array<string>
})
const emit = defineEmits<{
  (e: 'change-active', name: string): void
}>()
const model = defineModel()

const filter: Ref<Array<FilterItem>> = ref(
  props.items?.map((value, index) => {
    return {
      name: value,
      active: index === 0
    }
  }) || []
)

function setActive(name: string) {
  filter.value.forEach((item) => {
    item.active = name === item.name
  })
  model.value = name
  emit('change-active', name)
}
</script>

<template>
  <div>
    <el-button-group>
      <el-button
        v-for="(d, i) in filter"
        :key="i"
        :type="d.active ? 'primary' : 'default'"
        @click="setActive(d.name)"
        >{{ d.name }}</el-button
      >
    </el-button-group>
  </div>
</template>

<style>
</style>
