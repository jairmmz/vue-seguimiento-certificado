import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
    // dashboard
    { 
        path: '/', 
        name: 'home', 
        meta: { layout: 'auth', isGuest: true, requiresAuth: false }, 
        component: () => import('../views/pages/knowledge-base.vue'), 
    },
    { 
        path: '/admin', 
        name: 'home-admin', 
        meta: { requiresAuth: true }, 
        component: () => import('../views/finance.vue'), 
    },

    // apps
    {
        path: '/apps/chat',
        name: 'chat',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-chat" */ '../views/apps/chat.vue'),
    },
    {
        path: '/apps/mailbox',
        name: 'mailbox',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-mailbox" */ '../views/apps/mailbox.vue'),
    },
    {
        path: '/apps/todolist',
        name: 'todolist',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-todolist" */ '../views/apps/todolist.vue'),
    },
    {
        path: '/apps/notes',
        name: 'notes',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-notes" */ '../views/apps/notes.vue'),
    },
    {
        path: '/apps/scrumboard',
        name: 'scrumboard',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-scrumboard" */ '../views/apps/scrumboard.vue'),
    },
    // invoice
    {
        path: '/apps/invoice/list',
        name: 'invoice-list',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-invoice-list" */ '../views/apps/invoice/list.vue'),
    },
    {
        path: '/apps/invoice/preview',
        name: 'invoice-preview',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-invoice-preview" */ '../views/apps/invoice/preview.vue'),
    },
    {
        path: '/apps/invoice/add',
        name: 'invoice-add',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-invoice-add" */ '../views/apps/invoice/add.vue'),
    },
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
    {
        path: '/apps/invoice/edit',
        name: 'invoice-edit',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-invoice-edit" */ '../views/apps/invoice/edit.vue'),
    },
    {
        path: '/apps/calendar',
        name: 'calendar',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-calendar" */ '../views/apps/calendar.vue'),
    },
    
    // pages
    // Página de inicio
    {
        path: '/pages/error404',
        name: 'error404',
        component: () => import(/* webpackChunkName: "pages-error404" */ '../views/pages/error404.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/error500',
        name: 'error500',
        component: () => import(/* webpackChunkName: "pages-error500" */ '../views/pages/error500.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/error503',
        name: 'error503',
        component: () => import(/* webpackChunkName: "pages-error503" */ '../views/pages/error503.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/pages/maintenence',
        name: 'maintenence',
        component: () => import(/* webpackChunkName: "pages-maintenence" */ '../views/pages/maintenence.vue'),
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
        path: '/auth/cover-password-reset',
        name: 'cover-password-reset',
        component: () => import(/* webpackChunkName: "auth-cover-password-reset" */ '../views/auth/cover-password-reset.vue'),
        meta: { layout: 'auth' },
    },
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
