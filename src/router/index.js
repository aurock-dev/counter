import { createRouter, createWebHistory } from 'vue-router'
import CountersView from '@/views/CountersView.vue'
import SettingsView from '@/views/SettingsView.vue'
import LoginView from '@/views/LoginView.vue'
import SupabaseView from '@/views/SupabaseView.vue'
import ChartView from '@/views/ChartView.vue'
import { useAuthStore } from '@/store/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/',
            name: 'counters',
            component: CountersView,
            meta: { requiresAuth: true },
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
            meta: { requiresAuth: true },
        },

        {
            path: '/supabase',
            name: 'supabase',
            component: SupabaseView,
            meta: { requiresAuth: true },
        },
        {
            path: '/chart',
            name: 'chart',
            component: ChartView,
            meta: { requiresAuth: true },
        },
    ],
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
