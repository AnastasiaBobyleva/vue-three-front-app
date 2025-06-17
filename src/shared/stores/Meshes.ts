import { defineStore } from 'pinia'
import { type Mesh, type Group, type Color } from 'three'

interface State {
  data: Array<Group>
}

// Stores meshes data of the loaded models.
export const useMeshesStore = defineStore('meshes', {
  state: (): State => {
    return {
      data: [] as Array<Group>
    }
  },
  getters: {
    models(state): Array<Group> {
      return state.data
    }
  },
  actions: {
    addModel(model: Group) {
      if (!this.data) {
        this.data = new Array<Group>()
      }
      this.data?.push(model)
    },
    setModels(data: Array<Group>) {
      this.data = data
    },
    getFaces(face: Mesh, indices: Array<number>): Array<Mesh> {
      const body = face.parent
      const faces = new Array<Mesh>()
      if (body) {
        const indicesToFind = indices
        indicesToFind.forEach((index) => {
          const partFace = body.children[index - 1] as Mesh
          if (partFace) {
            faces.push(partFace)
          }
        })
      }
      return faces
    }
  }
})
