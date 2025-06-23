<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ClickableInfoCard from '@/widgets/ClickableInfoCard.vue'

import { useUserFilesStore } from '@/shared/stores/UserFiles'
import { type HttpError, processLoadingError } from '@/shared/services/ErrorHandler'
import example from '@/shared/assets/example.png'
import upload from '@/shared/assets/upload.png'

const modelsStore = useUserFilesStore()
const router = useRouter()
// const waitPromise = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

onMounted(() => {
  modelsStore.$reset()
})

function onUpload() {
  router.push({
    name: 'upload'
  })
}

function onExample() {
  const url = 'public/example.glb';

  // Wrap up sinchronous logic to provide error handling in catch section
  new Promise((resolve, reject) => {
    modelsStore.addUrl(url)
    resolve(url)
  }).then(() => {
    router.push({
      name: 'viewer'
    })
  })
  .catch((error: Error | HttpError | undefined) => {
    if (error) {
      if (error.name !== 'AbortError') {
        processLoadingError(router, error)
      }
    }
  })
}

</script>

<template>
  <div class="main-layout">
    <h1 class="title">Load & view 3D model</h1>
    <br />
    <div class="cards-layout">
      <ClickableInfoCard title="View sample" :image="example" opacity="50%" id="0" @click="onExample"/>
      <ClickableInfoCard title="Upload GLB" :image="upload" opacity="50%" id="1" @click="onUpload"/>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: monospace;
  font-weight: 100;
  font-size: xxx-large;
}
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
