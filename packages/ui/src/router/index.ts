import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { beforeRouteSwitch } from './guards'
import RootBootstrapRoute from './RootBootstrapRoute'

/**
 * Vue Router 配置
 *
 * 设计说明：
 * - 使用 hash 模式（#/basic/system）
 * - 路由懒加载，减少初始 bundle
 * - 路由守卫：监控导航事件
 */

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // 根路径重定向由 RootBootstrapRoute 处理：等待 globalSettings 恢复完成后决定初始工作区
    name: 'root',
    component: RootBootstrapRoute
  },
  {
    path: '/basic/user',
    name: 'basic-user',
    component: () => import('../components/basic-mode/BasicUserWorkspace.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: '/basic/user' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 挂载路由守卫
router.beforeEach(beforeRouteSwitch)

export default router
