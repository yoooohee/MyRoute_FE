import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('@/views/home/HomeView.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/auth/SignupView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/find-password',
      name: 'FindPassword',
      component: () => import('@/views/auth/FindPasswordView.vue'),
    },
    {
      path: '/attplan',
      name: 'MyPlanPage',
      component: () => import('@/views/plan/MyPlanPage.vue'),
    },
    {
      path: '/plan/confirm',
      name: 'PlanConfirm',
      component: () => import('@/views/plan/PlanConfirm.vue'),
    },
    {
      path: '/my-travel-plans',
      name: 'MyPlanList',
      component: () => import('@/views/plan/MyPlanList.vue'),
    },
    {
      path: '/my-plan-detail/:planId',
      name: 'MyPlanDetail',
      component: () => import('@/views/plan/MyPlanDetail.vue'),
    },
    {
      path: '/member/me',
      name: 'MyInfo',
      component: () => import('@/views/member/MyInfoView.vue'),
    },
    {
      path: '/planboard',
      name: 'PublicPlanBoard',
      component: () => import('@/views/plan/PublicPlanBoard.vue'),
    },
    {
      path: '/public-plan-detail/:planId',
      name: 'PublicPlanDetail',
      component: () => import('@/views/plan/PublicPlanDetail.vue'),
    },
  ],
})

export default router
