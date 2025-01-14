import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
    // dashboard
    {
        path: '/',
        name: 'home',
        meta: { layout: 'auth' },
        component: () => import('../views/pages/knowledge-base.vue'),
    },
    {
        path: '/admin',
        name: 'home-admin',
        meta: { requiresAuth: true },
        component: () => import('../views/finance.vue'),
    },

    // Participantes
    {
        path: '/apps/participants/index',
        name: 'participant-index',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/participant/Index.vue'),
    },
    {
        path: '/apps/participants/add',
        name: 'participant-add',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/participant/Add.vue'),
    },
    {
        path: '/apps/participants/edit/:id',
        name: 'participant-edit',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/participant/Add.vue'),
    },

    // Cursos
    {
        path: '/apps/courses/index',
        name: 'course-index',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/course/Index.vue'),
    },
    {
        path: '/apps/courses/add',
        name: 'course-add',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/course/Add.vue'),
    },
    {
        path: '/apps/courses/edit/:id',
        name: 'course-edit',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/course/Add.vue'),
    },

    // Inscripciones
    {
        path: '/apps/registration/index',
        name: 'registration-index',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/registration/Index.vue'),
    },
    {
        path: '/apps/registration/edit/:id',
        name: 'registration-edit',
        meta: { requiresAuth: true },
        component: () => import('../views/apps/registration/Add.vue'),
    },

    // Perfil de Usuario
    {
        path: '/usuario/perfil',
        name: 'user-profile',
        meta: { requiresAuth: true },
        component: () => import('../views/auth/Profile.vue'),
    },

    // Página de inicio
    {
        path: '/pages/error404',
        name: 'error404',
        component: () => import('../views/pages/error404.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/error500',
        name: 'error500',
        component: () => import('../views/pages/error500.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/error503',
        name: 'error503',
        component: () => import('../views/pages/error503.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/maintenence',
        name: 'maintenence',
        component: () => import('../views/pages/maintenence.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },

    // authentication
    {
        path: '/login',
        name: 'boxed-signin',
        component: () => import('../views/auth/boxed-signin.vue'),
        meta: { layout: 'auth', isGuest: true },
    },
    {
        path: '/recuperar-contrasenia',
        name: 'cover-password-reset',
        component: () => import('../views/auth/cover-password-reset.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/restablecer-contrasenia',
        name: 'password-reset',
        component: () => import('../views/auth/resetPassword.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/pages/error404.vue'),
        meta: { layout: 'auth' },
    }
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();
    const authStore = useAuthStore();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }

    if (to.meta.requiresAuth && !authStore.$state.token) {
        next({ name: 'boxed-signin' });
    } else if (authStore.$state.token && to.meta.isGuest) {
        next({ name: 'home-admin' });
    } else {
        next();
    }
});

router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});

export default router;
