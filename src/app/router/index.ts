import { createRouter, createWebHashHistory } from 'vue-router'
import ProcessTypesView from '@/pages/choose-type/ProcessTypesView.vue'
import UploadView from '@/pages/upload/UploadView.vue'
import NotFoundView from '@/pages/not-found/NotFoundView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'process',
      component: ProcessTypesView
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/viewer',
      name: 'viewer',
      // route level code-splitting
      // this generates a separate chunk (Viewer3D.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../pages/viewer/Viewer.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView
    }
  ]
})

export default router
