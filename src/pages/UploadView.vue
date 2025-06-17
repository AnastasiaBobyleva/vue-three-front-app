<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ChooseFileComponent from '@/widgets/ChooseFileComponent.vue'
import LoadingComponent from '@/widgets/LoadingComponent.vue'
import { useUserFilesStore } from '@/shared/stores/UserFiles'
import { HttpError } from '@/shared/services/ErrorHandler'

const loading = ref(false)
const modelName = ref('Model')
const userFilesStore = useUserFilesStore()

onMounted(() => {
  loading.value = false
  userFilesStore.$reset()
})

const waitPromise = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

/**
 * Async loading of models data from server
 * @param name
 */
function onLoading(name: string) {
  loading.value = true
  modelName.value = name

  const model = userFilesStore.models.at(0)
  if (!model) {
    throw new HttpError('Invalid model')
  }
  loading.value = false
}
</script>

<template>
  <div class="main-layout">
    <div v-if="loading">
      <LoadingComponent :modelName="modelName"/>
    </div>
    <div v-else>
      <ChooseFileComponent @loading-start="onLoading" fileList="GLB"/>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: block;
  text-align: center;
}
</style>
