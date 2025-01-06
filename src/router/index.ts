import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/index.vue';
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
        component: HomeView, 
    },
    {
        path: '/analytics',
        name: 'analytics',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "analytics" */ '../views/analytics.vue'),
    },
    {
        path: '/finance',
        name: 'finance',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "finance" */ '../views/finance.vue'),
    },
    {
        path: '/crypto',
        name: 'crypto',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "crypto" */ '../views/crypto.vue'),
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
    {
        path: '/apps/contacts',
        name: 'contacts',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "apps-contacts" */ '../views/apps/contacts.vue'),
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

    // components
    {
        path: '/components/tabs',
        name: 'tabs',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/components/tabs.vue'),
    },
    {
        path: '/components/accordions',
        name: 'accordions',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-accordions" */ '../views/components/accordions.vue'),
    },
    {
        path: '/components/modals',
        name: 'modals',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-modals" */ '../views/components/modals.vue'),
    },
    {
        path: '/components/cards',
        name: 'cards',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-cards" */ '../views/components/cards.vue'),
    },
    {
        path: '/components/carousel',
        name: 'carousel',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-carousel" */ '../views/components/carousel.vue'),
    },
    {
        path: '/components/countdown',
        name: 'countdown',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-countdown" */ '../views/components/countdown.vue'),
    },
    {
        path: '/components/counter',
        name: 'counter',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-counter" */ '../views/components/counter.vue'),
    },
    {
        path: '/components/sweetalert',
        name: 'sweetalert',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-sweetalert" */ '../views/components/sweetalert.vue'),
    },
    {
        path: '/components/timeline',
        name: 'timeline',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-timeline" */ '../views/components/timeline.vue'),
    },
    {
        path: '/components/notifications',
        name: 'notifications',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-notifications" */ '../views/components/notifications.vue'),
    },
    {
        path: '/components/media-object',
        name: 'media-object',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-media-object" */ '../views/components/media-object.vue'),
    },
    {
        path: '/components/list-group',
        name: 'list-group',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-list-group" */ '../views/components/list-group.vue'),
    },
    {
        path: '/components/pricing-table',
        name: 'pricing-table',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-pricing-table" */ '../views/components/pricing-table.vue'),
    },
    {
        path: '/components/lightbox',
        name: 'lightbox',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "components-lightbox" */ '../views/components/lightbox.vue'),
    },

    //elements
    {
        path: '/elements/alerts',
        name: 'alerts',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-alerts" */ '../views/elements/alerts.vue'),
    },
    {
        path: '/elements/avatar',
        name: 'avatar',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-avatar" */ '../views/elements/avatar.vue'),
    },
    {
        path: '/elements/badges',
        name: 'badges',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-badges" */ '../views/elements/badges.vue'),
    },
    {
        path: '/elements/breadcrumbs',
        name: 'breadcrumbs',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-breadcrumbs" */ '../views/elements/breadcrumbs.vue'),
    },
    {
        path: '/elements/buttons',
        name: 'buttons',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-buttons" */ '../views/elements/buttons.vue'),
    },
    {
        path: '/elements/buttons-group',
        name: 'buttons-group',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-buttons-group" */ '../views/elements/buttons-group.vue'),
    },
    {
        path: '/elements/color-library',
        name: 'color-library',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-color-library" */ '../views/elements/color-library.vue'),
    },
    {
        path: '/elements/dropdown',
        name: 'dropdown',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-dropdown" */ '../views/elements/dropdown.vue'),
    },
    {
        path: '/elements/infobox',
        name: 'infobox',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-infobox" */ '../views/elements/infobox.vue'),
    },
    {
        path: '/elements/jumbotron',
        name: 'jumbotron',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-jumbotron" */ '../views/elements/jumbotron.vue'),
    },
    {
        path: '/elements/loader',
        name: 'loader',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-loader" */ '../views/elements/loader.vue'),
    },
    {
        path: '/elements/pagination',
        name: 'pagination',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-pagination" */ '../views/elements/pagination.vue'),
    },
    {
        path: '/elements/popovers',
        name: 'popovers',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-popovers" */ '../views/elements/popovers.vue'),
    },
    {
        path: '/elements/progress-bar',
        name: 'progress-bar',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-progress-bar" */ '../views/elements/progress-bar.vue'),
    },
    {
        path: '/elements/search',
        name: 'search',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-search" */ '../views/elements/search.vue'),
    },
    {
        path: '/elements/tooltips',
        name: 'tooltips',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-tooltips" */ '../views/elements/tooltips.vue'),
    },
    {
        path: '/elements/treeview',
        name: 'treeview',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-treeview" */ '../views/elements/treeview.vue'),
    },
    {
        path: '/elements/typography',
        name: 'typography',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "elements-typography" */ '../views/elements/typography.vue'),
    },

    //charts
    {
        path: '/charts',
        name: 'charts',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "charts" */ '../views/charts.vue'),
    },

    //widgets
    {
        path: '/widgets',
        name: 'widgets',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "widgets" */ '../views/widgets.vue'),
    },

    //font-icons
    {
        path: '/font-icons',
        name: 'font-icons',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "font-icons" */ '../views/font-icons.vue'),
    },

    //dragndrop
    {
        path: '/dragndrop',
        name: 'dragndrop',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "dragndrop" */ '../views/dragndrop.vue'),
    },

    //tables
    {
        path: '/tables',
        name: 'tables',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "tables" */ '../views/tables.vue'),
    },

    //datatables
    {
        path: '/datatables/basic',
        name: 'datatables-basic',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-basic" */ '../views/datatables/basic.vue'),
    },
    {
        path: '/datatables/advanced',
        name: 'datatables-advanced',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-advanced" */ '../views/datatables/advanced.vue'),
    },
    {
        path: '/datatables/skin',
        name: 'skin',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-skin" */ '../views/datatables/skin.vue'),
    },
    {
        path: '/datatables/order-sorting',
        name: 'order-sorting',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-order-sorting" */ '../views/datatables/order-sorting.vue'),
    },
    {
        path: '/datatables/columns-filter',
        name: 'columns-filter',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-columns-filter" */ '../views/datatables/columns-filter.vue'),
    },
    {
        path: '/datatables/multi-column',
        name: 'multi-column',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-multi-column" */ '../views/datatables/multi-column.vue'),
    },
    {
        path: '/datatables/multiple-tables',
        name: 'multiple-tables',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-multiple-tables" */ '../views/datatables/multiple-tables.vue'),
    },
    {
        path: '/datatables/alt-pagination',
        name: 'alt-pagination',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-alt-pagination" */ '../views/datatables/alt-pagination.vue'),
    },
    {
        path: '/datatables/checkbox',
        name: 'checkbox',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-checkbox" */ '../views/datatables/checkbox.vue'),
    },
    {
        path: '/datatables/range-search',
        name: 'range-search',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-range-search" */ '../views/datatables/range-search.vue'),
    },
    {
        path: '/datatables/export',
        name: 'export',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-export" */ '../views/datatables/export.vue'),
    },
    {
        path: '/datatables/sticky-header',
        name: 'sticky-header',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-sticky-header" */ '../views/datatables/sticky-header.vue'),
    },
    {
        path: '/datatables/clone-header',
        name: 'clone-header',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-clone-header" */ '../views/datatables/clone-header.vue'),
    },
    {
        path: '/datatables/column-chooser',
        name: 'column-chooser',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "datatables-column-chooser" */ '../views/datatables/column-chooser.vue'),
    },

    //forms
    {
        path: '/forms/basic',
        name: 'basic',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-basic" */ '../views/forms/basic.vue'),
    },
    {
        path: '/forms/input-group',
        name: 'input-group',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-input-group" */ '../views/forms/input-group.vue'),
    },
    {
        path: '/forms/layouts',
        name: 'layouts',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-layouts" */ '../views/forms/layouts.vue'),
    },
    {
        path: '/forms/validation',
        name: 'validation',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-validation" */ '../views/forms/validation.vue'),
    },
    {
        path: '/forms/input-mask',
        name: 'input-mask',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-input-mask" */ '../views/forms/input-mask.vue'),
    },
    {
        path: '/forms/select2',
        name: 'select2',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-select2" */ '../views/forms/select2.vue'),
    },
    {
        path: '/forms/touchspin',
        name: 'touchspin',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-touchspin" */ '../views/forms/touchspin.vue'),
    },
    {
        path: '/forms/checkbox-radio',
        name: 'checkbox-radio',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-checkbox-radio" */ '../views/forms/checkbox-radio.vue'),
    },
    {
        path: '/forms/switches',
        name: 'switches',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-switches" */ '../views/forms/switches.vue'),
    },
    {
        path: '/forms/wizards',
        name: 'wizards',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-wizards" */ '../views/forms/wizards.vue'),
    },
    {
        path: '/forms/file-upload',
        name: 'file-upload',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-file-upload" */ '../views/forms/file-upload.vue'),
    },
    {
        path: '/forms/quill-editor',
        name: 'quill-editor',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-quill-editor" */ '../views/forms/quill-editor.vue'),
    },
    {
        path: '/forms/markdown-editor',
        name: 'markdown-editor',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-markdown-editor" */ '../views/forms/markdown-editor.vue'),
    },
    {
        path: '/forms/date-picker',
        name: 'date-picker',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-date-picker" */ '../views/forms/date-picker.vue'),
    },
    {
        path: '/forms/clipboard',
        name: 'clipboard',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "forms-clipboard" */ '../views/forms/clipboard.vue'),
    },

    // users
    {
        path: '/users/profile',
        name: 'profile',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "users-profile" */ '../views/users/profile.vue'),
    },
    {
        path: '/users/user-account-settings',
        name: 'user-account-settings',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "users-user-account-settings" */ '../views/users/user-account-settings.vue'),
    },

    // pages
    {
        path: '/pages/knowledge-base',
        name: 'knowledge-base',
        meta: { isGuest: true },
        component: () => import('../views/pages/knowledge-base.vue'),
    },
    {
        path: '/pages/contact-us-boxed',
        name: 'contact-us-boxed',
        component: () => import(/* webpackChunkName: "pages-contact-us-boxed" */ '../views/pages/contact-us-boxed.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/pages/contact-us-cover',
        name: 'contact-us-cover',
        component: () => import(/* webpackChunkName: "pages-contact-us-cover" */ '../views/pages/contact-us-cover.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/pages/faq',
        name: 'faq',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "pages-faq" */ '../views/pages/faq.vue'),
    },
    {
        path: '/pages/coming-soon-boxed',
        name: 'coming-soon-boxed',
        component: () => import(/* webpackChunkName: "pages-coming-soon-boxed" */ '../views/pages/coming-soon-boxed.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
    {
        path: '/pages/coming-soon-cover',
        name: 'coming-soon-cover',
        component: () => import(/* webpackChunkName: "pages-coming-soon-cover" */ '../views/pages/coming-soon-cover.vue'),
        meta: { layout: 'auth', requiresAuth: true },
    },
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
        component: () => import(/* webpackChunkName: "auth-boxed-signin" */ '../views/auth/boxed-signin.vue'),
        meta: { layout: 'auth', isGuest: true },
    },
    {
        path: '/auth/boxed-signup',
        name: 'boxed-signup',
        component: () => import(/* webpackChunkName: "auth-boxed-signup" */ '../views/auth/boxed-signup.vue'),
        meta: { layout: 'auth', isGuest: true },
    },
    {
        path: '/auth/boxed-lockscreen',
        name: 'boxed-lockscreen',
        component: () => import(/* webpackChunkName: "auth-boxed-lockscreen" */ '../views/auth/boxed-lockscreen.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/boxed-password-reset',
        name: 'boxed-password-reset',
        component: () => import(/* webpackChunkName: "auth-boxed-password-reset" */ '../views/auth/boxed-password-reset.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/cover-login',
        name: 'cover-login',
        component: () => import(/* webpackChunkName: "auth-cover-login" */ '../views/auth/cover-login.vue'),
        meta: { layout: 'auth', isGuest: true },
    },
    {
        path: '/auth/cover-register',
        name: 'cover-register',
        component: () => import(/* webpackChunkName: "auth-cover-register" */ '../views/auth/cover-register.vue'),
        meta: { layout: 'auth', isGuest: true },
    },
    {
        path: '/auth/cover-lockscreen',
        name: 'cover-lockscreen',
        component: () => import(/* webpackChunkName: "auth-cover-lockscreen" */ '../views/auth/cover-lockscreen.vue'),
        meta: { layout: 'auth' },
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
