import { defineStore } from 'pinia'

interface State {
  data: Array<File>
}

const DEFAULT_MODELNAME = 'Model'

// Stores information state of all GLB files get from user or server
export const useUserFilesStore = defineStore('userFiles', {
  state: (): State => {
    return {
      data: [] as Array<File>
    }
  },
  getters: {
    models(state): Array<File> {
      return state.data
    },
    model(state): File | undefined {
      return state.data.at(0)
    }
  },
  actions: {
    filename(index: number = 0): string {
      return this.data.at(index)?.name ?? DEFAULT_MODELNAME
    },
    addModel(modelData: File) {
      this.data.push(modelData)
    },
    hasModel(modelData: File): boolean {
      return this.getModel(modelData.name) !== undefined
    },
    getModel(name: string): File | undefined {
      return this.data.find((item) => item.name === name)
    },
    setModels(modelsData: Array<File>) {
      this.data = [...modelsData]
    },
    modelName(index: number): string | undefined {
      return this.data.at(index)?.name ?? DEFAULT_MODELNAME
    }
  }
})
