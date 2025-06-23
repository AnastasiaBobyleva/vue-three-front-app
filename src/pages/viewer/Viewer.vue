<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { type Object3D } from 'three'
import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'// 'three/addons/loaders/GLTFLoader.js'
import { type ViewerElement, DataLoader, Viewer } from 'three-viewer'

import LoadingComponent from '@/widgets/LoadingComponent.vue'
import ItemListSidebar from '@/widgets/ItemListSidebar.vue'

import LogoComponent from '@/shared/ui/LogoComponent.vue'
import HomeButton from '@/shared/ui/HomeButton.vue'
import { useUserFilesStore } from '@/shared/stores/UserFiles'
import { processLoadingError, HttpError } from '@/shared/services/ErrorHandler'
import { type ModelInfo } from '@/shared/types/ModelInfo'

const DEFAULT_MODELNAME = 'Model'

const router = useRouter()
const userFilesStore = useUserFilesStore()
const loading = ref(userFilesStore.models?.length > 0 || userFilesStore.urls.length > 0)
const modelName = ref(DEFAULT_MODELNAME)

const waitPromise = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

// Manage sidebar information
// const modelMetadata: Ref<Array<ModelInfo>> = ref([])
// const activeBodyID = '0'

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

  if (userFilesStore.models.length === 0 && userFilesStore.urls.length === 0) {
    processModelFail('Oops. Seems that model loading failed.')
    return
  } else {
    loading.value = true
  }

  let loadingProcess = (loader: DataLoader, fileURL: string, fileName?: string) => {
    return loader
      .load(fileURL)
      .then((model: GLTF) => {
         model.scene.userData.name = fileName ?? DEFAULT_MODELNAME
         viewer.showModel(model)
       })
      .catch((error) => {
        processModelFail(error)
      })
  }

  const loader = new DataLoader()
  userFilesStore.models.forEach((modelFile) => {
    modelName.value = modelFile.name
    const fileURL = URL.createObjectURL(modelFile)
    const loadingPromise = loadingProcess(loader, fileURL, modelFile.name)
    promises.push(loadingPromise)
  })
  userFilesStore.urls.forEach((fileURL) => {
    const loadingPromise = loadingProcess(loader, fileURL)
    promises.push(loadingPromise)
  })

  Promise.all([promises, waitPromise(1000)]).then(() => {
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
          backgroundColor="0xdddddd"
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
        <!--<ItemListSidebar :data="modelMetadata" :activeID="activeBodyID""/>-->
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
