import { defineStore } from 'pinia'

interface State {
  files: Array<File>,
  urlsData: Array<string>
}

const DEFAULT_MODELNAME = 'Model'

// Stores information state of all GLB files get from user or server
export const useUserFilesStore = defineStore('userFiles', {
  state: (): State => {
    return {
      files: [] as Array<File>,
      urlsData: [] as Array<string>
    }
  },
  getters: {
    models(state): Array<File> {
      return state.files
    },
    model(state): File | undefined {
      return state.files.at(0)
    },
    urls(state): Array<string> {
      return state.urlsData;
    }
  },
  actions: {
    filename(index: number = 0): string {
      return this.files.at(index)?.name ?? DEFAULT_MODELNAME
    },
    addModel(modelData: File) {
      this.files.push(modelData)
    },
    getModel(name: string): File | undefined {
      return this.files.find((item) => item.name === name)
    },
    setModels(modelsData: Array<File>) {
      this.files = [...modelsData]
    },
    addUrl(url: string) {
      this.urls.push(url)
    }
  }
})
