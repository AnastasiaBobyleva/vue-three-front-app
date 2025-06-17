import { createRouter, createWebHashHistory } from 'vue-router'
import ProcessTypesView from '@/pages/ProcessTypesView.vue'
import UploadView from '@/pages/UploadView.vue'
import NotFoundView from '@/pages/NotFoundView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'process',
      component: ProcessTypesView
    },
    {
      path: '/upload/:type',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/viewer',
      name: 'viewer',
      // route level code-splitting
      // this generates a separate chunk (Viewer3D.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../pages/Viewer.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView
    }
  ]
})

export default router
