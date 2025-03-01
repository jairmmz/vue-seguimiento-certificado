<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <div class="flex justify-between items-center px-4 py-3">
                    <router-link to="/admin" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="" />
                        <span class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">DITT</span>
                    </router-link>
                    <a
                        href="javascript:;"
                        class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
                        @click="store.toggleSidebar()"
                    >
                        <icon-carets-down class="m-auto rotate-90" />
                    </a>
                </div>
                <perfect-scrollbar
                    :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }"
                    class="h-[calc(100vh-80px)] relative"
                >
                    <ul class="relative font-semibold space-y-0.5 p-4 py-0">
                        <li class="nav-item">
                            <ul>
                                <!-- Participantes -->
                                <li class="menu nav-item">
                                    <button
                                        type="button"
                                        class="nav-link group w-full"
                                        :class="{ active: activeDropdown === 'participants' }"
                                        @click="activeDropdown === 'participants' ? (activeDropdown = null) : (activeDropdown = 'participants')"
                                    >
                                        <div class="flex items-center">
                                            <icon-menu-users class="group-hover:!text-primary shrink-0" />

                                            <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                t('participants')
                                            }}</span>
                                        </div>
                                        <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'participants' }">
                                            <icon-caret-down />
                                        </div>
                                    </button>
                                    <vue-collapsible :isOpen="activeDropdown === 'participants'">
                                        <ul class="sub-menu text-gray-500">
                                            <li>
                                                <router-link to="/apps/participants/index" @click="toggleMobileMenu">{{ t('list') }}</router-link>
                                            </li>
                                            <li>
                                                <router-link to="/apps/participants/add" @click="toggleMobileMenu">{{ t('add') }}</router-link>
                                            </li>
                                        </ul>
                                    </vue-collapsible>
                                </li>

                                <!-- Participantes -->
                                <li class="menu nav-item">
                                    <button
                                        type="button"
                                        class="nav-link group w-full"
                                        :class="{ active: activeDropdown === 'courses' }"
                                        @click="activeDropdown === 'courses' ? (activeDropdown = null) : (activeDropdown = 'courses')"
                                    >
                                        <div class="flex items-center">
                                            <icon-menu-notes class="group-hover:!text-primary shrink-0" />

                                            <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                t('courses')
                                            }}</span>
                                        </div>
                                        <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'courses' }">
                                            <icon-caret-down />
                                        </div>
                                    </button>
                                    <vue-collapsible :isOpen="activeDropdown === 'courses'">
                                        <ul class="sub-menu text-gray-500">
                                            <li>
                                                <router-link to="/apps/courses/index" @click="toggleMobileMenu">{{ t('list') }}</router-link>
                                            </li>
                                            <li>
                                                <router-link to="/apps/courses/add" @click="toggleMobileMenu">{{ t('add') }}</router-link>
                                            </li>
                                        </ul>
                                    </vue-collapsible>
                                </li>

                                <!-- Inscripciones -->
                                <li class="nav-item">
                                    <router-link to="/apps/registration/index" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">
                                            <icon-menu-charts class="group-hover:!text-primary shrink-0" />

                                            <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                t('registrations')
                                            }}</span>
                                        </div>
                                    </router-link>
                                </li>

                                <!-- Reportes -->
                                <li class="nav-item">
                                    <router-link to="/apps/reports" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">
                                            <icon-menu-todo class="group-hover:!text-primary shrink-0" />

                                            <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                t('reports')
                                            }}</span>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </perfect-scrollbar>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useAppStore } from '@/stores/index';
    import VueCollapsible from 'vue-height-collapsible/vue3';
    import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
    import IconMenuTodo from '@/components/icon/menu/icon-menu-todo.vue';
    import IconMenuNotes from '@/components/icon/menu/icon-menu-notes.vue';
    import IconMenuUsers from '@/components/icon/menu/icon-menu-users.vue';
    import IconMenuCharts from '@/components/icon/menu/icon-menu-charts.vue';
    import IconCaretDown from '@/components/icon/icon-caret-down.vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const store = useAppStore();
    const activeDropdown: any = ref('');

    onMounted(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    });

    const toggleMobileMenu = () => {
        if (window.innerWidth < 1024) {
            store.toggleSidebar();
        }
    };
</script>
