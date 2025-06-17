<script setup lang="ts">
import { type Ref, ref, watch, onUnmounted } from 'vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'

interface Item {
  id: string
  name: string
  description: string
  imageURL?: string
}

const props = defineProps<{
  data: Array<Item>,
  activeID: string | undefined
}>()

const emit = defineEmits<{
  (e: 'item-select', item: Item): void
}>()

let selectedItem: Ref<Item | undefined> = ref(undefined)

const stopWatching = watch(() => props.activeID, (newValue, oldValue) => {
  selectedItem.value = props.data.find(body => props.activeID === body.id )
})

function onCardClick(item: Item) {
  selectedItem.value = item
  // Process item select logic here
  emit('item-select', item)
}
function isSelected(item: Item) {
  return selectedItem.value?.id === item.id
}

onUnmounted(() => {
  stopWatching()
})

</script>

<template>
  <div class="main-layout tree">
    <div v-for="(e, i) in data" v-bind:key="i">
      <el-card class="cardDefault" shadow='hover' @click="onCardClick(e)" :class="{ cardSelected: isSelected(e)}">
        <div class="horizontal-layout">
          <div class="item min-width">
            <br />
            <el-text type="info">{{ e.name }}</el-text>  
            <br />
            <el-text type="info">{{ e.description }} pc.</el-text>
          </div>
          <el-image :src="e.imageURL" style="width: 200px; height: 200px; overflow: unset">
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture/></el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
.main-layout {
  display: flex;
  min-width: 0px;
  align-items: stretch;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
  }
  span {
    align-self: flex-start;
  }
  margin-right: auto;
}

.tree {
  gap: 0.5em;
  overflow: auto;
}

.horizontal-layout {
  display: flex;
  flex-flow: row wrap-reverse;
  gap: 1em;
  align-items: center;
  justify-content: center;
  .item {
    flex: 0 2 auto;
  }
}

.min-width {
  min-width: 0px;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-border-color);

  .el-icon {
    font-size: 120px;
  }
}

.cardDefault.cardSelected {
  border-width: 1px;
  border-color: var(--el-color-primary);
}

.cardDefault {
  max-width: 300px;
  .secondary-text {
    color: var(--el-text-color-secondary);
  }
}

.el-card {
  cursor: pointer;
}

@media (max-width: 700px) {
  .main-layout {
    flex-flow: row nowrap;
  }
  .horizontal-layout {
    flex-flow: row nowrap;
  }
}
@media (min-width: 701px) {
  .main-layout {
    flex-flow: column nowrap;
  }
}
</style>
