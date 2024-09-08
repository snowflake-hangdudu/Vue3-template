import AntIcon from '@/assets/icons'
import { Layout } from '@/router/routerHelper'
import { defineAsyncCP } from '@/utils/asyncRouter'

/** 线上环境不展示 */
export const debugRoutes: AppRouteRecordRaw[] = [
  {
    path: '/debug',
    component: Layout,
    redirect: '/common/icons/index',
    name: 'Debug',
    meta: {
      title: '[DEV]调试功能',
      icon: AntIcon.coffee,
      alwaysInRoles: true
    },
    children: [
      {
        path: 'index',
        component: () => defineAsyncCP(() => import('@/public-pages/iconTable.vue')),
        name: 'Icons',
        meta: {
          title: 'Ant Icons',
          icon: AntIcon.antDesign,
          noCache: true,
          alwaysInRoles: true
        }
      },
      {
        path: 'upload',
        component: () => defineAsyncCP(() => import('@/public-pages/uploadImg.vue')),
        name: 'Upload',
        meta: {
          title: '图片上传',
          icon: AntIcon.cloudUpload,
          noCache: true,
          alwaysInRoles: true
        }
      },
      {
        path: 'cosplay',
        component: () => defineAsyncCP(() => import('@/public-pages/buju.vue')),
        name: 'Cosplay',
        meta: {
          title: '布局',
          icon: AntIcon.qq,
          noCache: true,
          alwaysInRoles: true
        }
      },
      {
        path: 'todo',
        component: () => defineAsyncCP(() => import('@/public-pages/uploadFiles.vue')),
        name: 'files',
        meta: {
          title: '上传文件',
          icon: AntIcon.scan,
          noCache: true,
          alwaysInRoles: true
        }
      },
      {
        path: 'buttonRole',
        component: () => defineAsyncCP(() => import('@/public-pages/buttonRole.vue')),
        name: 'buttonRole',
        meta: {
          title: '按钮级权限',
          icon: AntIcon.scan,
          noCache: true,
          alwaysInRoles: true
        }
      },
      {
        path: 'flex',
        component: () => defineAsyncCP(() => import('@/public-pages/flex.vue')),
        name: 'flex',
        meta: {
          title: 'Flex布局',
          icon: AntIcon.scan,
          noCache: true,
          alwaysInRoles: true
        }
      },
      {
        path: 'test',
        component: () => defineAsyncCP(() => import('@/public-pages/test.vue')),
        name: 'test',
        meta: {
          title: '测试页面',
          icon: AntIcon.scan,
          noCache: true,
          alwaysInRoles: true
        }
      },
      {
        path: 'test1',
        component: () => defineAsyncCP(() => import('@/public-pages/test1.vue')),
        name: 'test1',
        meta: {
          title: '测试1页面',
          icon: AntIcon.scan,
          noCache: true,
          alwaysInRoles: true
        }
      }
    ]
  }
]
