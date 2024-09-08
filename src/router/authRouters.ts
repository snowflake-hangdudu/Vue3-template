import { defineAsyncCP } from '../utils/asyncRouter'
import AntIcon from '../assets/icons'
// import { commonRoutes } from '@/public-pages/@route'
import { orderRoutes } from '@/public-order/@route'
import { teacherRoutes } from '@/public-teacher/@route'
import { Layout } from './routerHelper'

const dashboard = {
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/analysis',
  name: 'Dashboard',
  meta: {
    title: 'Dashboard',
    alwaysInRoles: true
  },
  children: [
    {
      path: 'analysis',
      component: () => defineAsyncCP(() => import('@/views/index.vue')),
      name: 'Analysis',
      meta: {
        title: '首页',
        icon: 'ant-design:dashboard-filled',
        noCache: true,
        affix: false,
        alwaysInRoles: true
      }
    }
  ]
}

/**
 * 权限路由
 */
export default [
  /** 首页 **/
  dashboard,
  ...orderRoutes,
  ...teacherRoutes
] as AppRouteRecordRaw[]

export const moduleRouters = {
  dashboard,
  orderRoutes,
  teacherRoutes
}
