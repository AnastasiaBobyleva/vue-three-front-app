<script setup lang="ts">
import type { UploadProps } from 'element-plus'

import HomeButton from '@/shared/ui/HomeButton.vue'
import { useUserFilesStore } from '@/shared/stores/UserFiles'


defineProps({
  id: Number,
  fileList: String
})
const emit = defineEmits<{
  (e: 'loading-start', modelName: string): void
}>()
const store = useUserFilesStore()

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  store.setModels(uploadFiles.map((elem) => elem.raw as File))
  emit('loading-start', uploadFiles.at(0)?.name ?? 'Model')
}
</script>

<template>
  <div class="main-layout">
    <div class="header">
      <HomeButton></HomeButton>
    </div>
    <br />
    <el-upload
      ref="upload"
      class="upload-component"
      drag
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleChange"
      :accept="fileList"
      :limit="1"
      multiple
    >
      <div class="upload-text">
        <div class="el-upload__text">Choose a part to be uploaded</div>
        <div class="el-upload__text">Drop a .GLB file or <em>browse it on your PC.</em></div>
      </div>
    </el-upload>
  </div>
</template>

<style scoped>
.main-layout {
  display: block;
  text-align: center;

  .header {
    display: grid;
    grid-gap: 20px;
    justify-content: left;
    grid-template-columns: repeat(3, calc(33.33% - 20px));
  }
}
.upload-component {
  .upload-text {
    height: 70vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
}
</style>
