<script setup lang="ts">
import { ref, type Ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { type Object3D } from 'three'
import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'// 'three/addons/loaders/GLTFLoader.js'

import HomeButton from '@/widgets/HomeButton.vue'
import LoadingComponent from '@/widgets/LoadingComponent.vue'
import LogoComponent from '@/widgets/LogoComponent.vue'
import ItemListSidebar from '@/widgets/ItemListSidebar.vue'

import { useUserFilesStore } from '@/shared/stores/UserFiles'
import { processLoadingError, HttpError } from '@/shared/services/ErrorHandler'
import { type ModelInfo } from '@/shared/types/ModelInfo'

import { type ViewerElement, DataLoader, Viewer } from 'three-viewer'

const router = useRouter()
const userFilesStore = useUserFilesStore()
const loading = ref(userFilesStore.models?.length > 0)

const modelMetadata: Ref<Array<ModelInfo>> = ref([])
const activeBodyID = '0'

// Viewer
const viewerElem = ref<ViewerElement | null>(null)
let viewer: Viewer

// Viewer notification
const hasViewerNotification = ref(false)
const viewerNotificationContent = ref('')

onUnmounted(() => {
  viewer.dispose()
})

function processModelFail(error: string = '') {
  console.error(error)
  processLoadingError(router, new HttpError(error)).then(() => {
    loading.value = false;
  })
}

function onViewer3dCreated() {
  // Start model opening and displaying
  const promises: Array<Promise<any>> = []
  viewer = new Viewer('viewerElem')

  if (userFilesStore.models?.length === 0) {
    processModelFail('Model convertion failed.')
    return
  }

  const loader = new DataLoader()
  userFilesStore.models.forEach((modelFile) => {
    const fileUrl = URL.createObjectURL(modelFile)
    modelMetadata.value
    const loadingPromise = loader
      .load(fileUrl)
      .then((model: GLTF) => {
         model.scene.userData.name = modelFile.name
         viewer.showModel(model)
       })
      .catch((error) => {
        processModelFail(error)
      })
    promises.push(loadingPromise)
  })

  Promise.all(promises).then(() => {
    loading.value = false
  })

  // Actions on 3D model is added into viewer scene
  viewer.signals.modelAdded.on((model: Object3D) => {
    viewer.scene.resizeViewer()
  })

  // Actions on selection of model mesh part
  viewer.signals.partHighlightedChanged.on((eventData) => {
  })
}
</script>

<template>
  <div v-if="loading">
    <LoadingComponent :modelName="userFilesStore.filename()"/>
  </div>
    <el-container>
      <el-header class="top-layout" height="36px">
        <HomeButton/>
      </el-header>
      <div class="viewer-layout">
        <div style="position: relative; width: 100%; height: 100%" class="item">
          <viewer-element
            ref="viewerElem"
            id="viewerElem"
            class="viewer-element"
            viewHelper
            backgroundColor="0xaaaaaa"
            @created="onViewer3dCreated"
          >
            <div class="logo-layout">
              <LogoComponent/>
            </div>
            <el-card v-if="hasViewerNotification" class="viewer-notification none-selectable-text">
              {{ viewerNotificationContent }}
            </el-card>
          </viewer-element>
        </div>
        <el-scrollbar>
          <div class="sidebar">
          <ItemListSidebar :data="modelMetadata" :activeID="activeBodyID""/>
          </div>
        </el-scrollbar>
      </div>
    </el-container>
</template>

<style scoped>
.viewer-element {
  border-radius: 4px;
}

.sidebar {
  /*overflow: auto*/
}

.top-layout {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 16px;
  padding: 0;

  .item {
    flex: 0 0 auto;
  }

  .center-item {
    flex: 1 0 auto;
    margin-right: 200px;
    text-align: center;
  }
}
.horizontal-layout {
  display: flex;
  flex-flow: row nowrap;
  gap: 1em;
  margin-top: 1rem;
  .item {
    flex: 1 1 fit-content;
  }
  .item:first-child {
    flex: 1 1 auto;
  }
}

.vertical-layout {
  display: flex;
  flex-flow: column nowrap;
  min-width: 0px;
  margin-right: auto;
}

.logo-layout {
  position: absolute;
  bottom: 1em;
  left: 1em;
}

.viewer-notification {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #ffffff33;
  border: none;
}

.viewer-layout {
  display: grid;
  gap: 1em;
  align-items: stretch;
  height: calc(100vh - 38px - 2em);
}

@media (max-width: 700px) {
  .viewer-layout {
    grid-template-rows: 2fr min-content;
  }
}
@media (min-width: 701px) {
  .viewer-layout {
    grid-template-columns: 1fr min-content;
  }
}
</style>
