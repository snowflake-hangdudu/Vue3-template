import AntIcon from '@/assets/icons'
import { Layout } from '@/router/routerHelper'
import { defineAsyncCP } from '@/utils/asyncRouter'

/** 线上环境不展示 */
export const orderRoutes: AppRouteRecordRaw[] = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order',
    name: 'Order',
    meta: {
      title: '订单管理',
      icon: AntIcon.coffee,
      alwaysInRoles: true
    },
    children: [
      {
        path: 'order',
        component: () => defineAsyncCP(() => import('@/public-order/pages/order-manage/order.vue')),
        name: 'order',
        meta: {
          title: '订单管理',
          icon: AntIcon.antDesign,
          noCache: true,
          alwaysInRoles: true
        }
      }
    ]
  }
]
