import AntIcon from '@/assets/icons'
import { Layout } from '@/router/routerHelper'
import { defineAsyncCP } from '@/utils/asyncRouter'

/** 线上环境不展示 */
export const teacherRoutes: AppRouteRecordRaw[] = [
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/teacher',
    name: 'Teacher',
    meta: {
      title: '教师库管理',
      icon: AntIcon.coffee,
      alwaysInRoles: true
    },
    children: [
      {
        path: 'teacher',
        component: () => defineAsyncCP(() => import('@/public-teacher/pages/teacher-manage/teacher.vue')),
        name: 'teacher',
        meta: {
          title: '教师库管理',
          icon: AntIcon.antDesign,
          noCache: true,
          alwaysInRoles: true
        }
      }
    ]
  }
]
