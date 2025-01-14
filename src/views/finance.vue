<template>
    <div>
        <div class="pt-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                <!-- Usuarios -->
                <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">N° de Participantes</div>
                        <div class="dropdown">
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                                <button type="button">
                                    <icon-horizontal-dots class="hover:opacity-80 opacity-70" />
                                </button>
                                <template #content="{ close }">
                                    <ul @click="close()" class="text-black dark:text-white-dark">
                                        <li>
                                            <router-link :to="{ name: 'participant-index' }"> Ver </router-link>
                                        </li>
                                        <li>
                                            <router-link :to="{ name: 'participant-add' }"> Agregar </router-link>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">{{ numberParticipants }}</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">
                        Último Registro: {{ lastParticipant ? extractDateFromISO(lastParticipant.created_at) : '' }}
                    </div>
                </div>

                <!-- Cursos -->
                <div class="panel bg-gradient-to-r from-violet-500 to-violet-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">N° de Cursos</div>
                        <div class="dropdown">
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                                <button type="button">
                                    <icon-horizontal-dots class="hover:opacity-80 opacity-70" />
                                </button>
                                <template #content="{ close }">
                                    <ul @click="close()" class="text-black dark:text-white-dark">
                                        <li>
                                            <router-link :to="{ name: 'course-index' }"> Ver </router-link>
                                        </li>
                                        <li>
                                            <router-link :to="{ name: 'course-add' }"> Agregar </router-link>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">{{ numberCourses }}</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">Último Registro: {{ lastCourse ? extractDateFromISO(lastCourse.created_at) : '' }}</div>
                </div>

                <!-- Inscripciones -->
                <div class="panel bg-gradient-to-r from-blue-500 to-blue-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">N° de Inscripciones</div>
                        <div class="dropdown">
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                                <button type="button">
                                    <icon-horizontal-dots class="hover:opacity-80 opacity-70" />
                                </button>
                                <template #content="{ close }">
                                    <ul @click="close()" class="text-black dark:text-white-dark">
                                        <li>
                                            <router-link :to="{ name: 'registration-index' }"> Ver </router-link>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">{{ numberRegistrations }}</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">
                        Último Registro: {{ lastRegistration ? extractDateFromISO(lastRegistration.created_at) : '' }}
                    </div>
                </div>

                <!-- Certificados -->
                <div class="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">N° de Certificados</div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">{{ numberCertificates }}</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">
                        Último Registro: {{ lastCertificate ? extractDateFromISO(lastCertificate.created_at) : '' }}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div class="grid gap-6 xl:grid-flow-row">
                    <!-- Previous Statement -->
                    <div class="panel overflow-hidden">
                        <div class="mb-5 text-lg font-bold">Participantes sin inscripción</div>
                        <vue3-datatable
                            ref="datatableParticipants"
                            :loading="isLoadingFetchParticipant"
                            :rows="participants"
                            :columns="colsParticipants"
                            :totalRows="participants?.length"
                            :sortable="false"
                            :search="searchParticipants"
                            paginationInfo="Mostrando {0} a {1} de {2} entradas"
                            noDataContent="No hay datos disponibles"
                            skin=""
                            firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                            lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                            previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                            nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        >
                        </vue3-datatable>
                    </div>

                    <!-- Current Statement -->
                    <div class="panel overflow-hidden">
                        <div class="mb-5 text-lg font-bold">Cursos sin inscripción</div>
                        <vue3-datatable
                            ref="datatableCourses"
                            :loading="isLoadingFetchCourses"
                            :rows="courses"
                            :columns="colsCourses"
                            :totalRows="courses?.length"
                            :sortable="false"
                            :search="searchCourses"
                            paginationInfo="Mostrando {0} a {1} de {2} entradas"
                            noDataContent="No hay datos disponibles"
                            skin=""
                            firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                            lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                            previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                            nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        >
                        </vue3-datatable>
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="panel">
                    <div class="mb-5 text-lg font-bold">Certificados sin asignar</div>
                    <vue3-datatable
                        ref="datatableRegistrations"
                        :loading="isLoadingFetchRegistrations"
                        :rows="participantsCourses"
                        :columns="colsRegistrations"
                        :totalRows="participantsCourses?.length"
                        :sortable="false"
                        :search="searchRegistrations"
                        paginationInfo="Mostrando {0} a {1} de {2} entradas"
                        noDataContent="No hay datos disponibles"
                        skin=""
                        firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                        previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    >
                    </vue3-datatable>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
    import { useGetIndex } from './actions-home/getIndex';
    import { Certificate, Course, Participant, Registration } from './types-home';
    import { useGetParticipantsWithoutRegistration } from './actions-home/getParticipantsWithoutRegistration';
    import { useGetCoursesWithoutRegistrations } from './actions-home/getCoursesWithoutRegistrations';
    import { useGetRegistrationsWithoutCertificate } from './actions-home/getRegistrationsWithoutCertificate';

    useMeta({ title: 'Administrador Home' });
    const store = useAppStore();

    const { indexData, participantsWithoutRegistration, isLoadingFetchData } = useGetIndex();
    const { getParticipantsWithoutRegistration, participants, isLoadingFetchParticipant } = useGetParticipantsWithoutRegistration();
    const { getCoursesWithoutRegistrations, courses, isLoadingFetchCourses } = useGetCoursesWithoutRegistrations();
    const { getRegistrationsWithoutCertificate, participantsCourses, isLoadingFetchRegistrations } = useGetRegistrationsWithoutCertificate();

    const numberParticipants = ref<number>(0);
    const numberCourses = ref<number>(0);
    const numberRegistrations = ref<number>(0);
    const numberCertificates = ref<number>(0);

    const lastParticipant = ref<Participant | null>(null);
    const lastCourse = ref<Course | null>(null);
    const lastRegistration = ref<Registration | null>(null);
    const lastCertificate = ref<Certificate | null>(null);

    const extractDateFromISO = (isoDate: string): string => {
        const date = new Date(isoDate);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    };

    // Participantes
    const datatableParticipants: any = ref(null);
    const searchParticipants = ref('');

    const colsParticipants = ref([
        { field: 'id', title: 'ID', width: '5%' },
        { field: 'name', title: 'Nombres', width: '40%' },
        { field: 'last_name', title: 'Apellidos', width: '40%' },
        { field: 'identification', title: 'Identificación', width: '15%' },
    ]);

    // Cursos
    const datatableCourses: any = ref(null);
    const searchCourses = ref('');

    const colsCourses = ref([
        { field: 'id', title: 'ID', width: '5%' },
        { field: 'name', title: 'Curso', width: '50%' },
        { field: 'description', title: 'Descripción', width: '45%' },
    ]);

    // Inscripciones
    const datatableRegistrations: any = ref(null);
    const searchRegistrations = ref('');

    const colsRegistrations = ref([
        { field: 'id', title: 'ID', width: '5%' },
        { field: 'participant.name', title: 'Nombres', width: '20%' },
        { field: 'participant.last_name', title: 'Apellidos', width: '25%' },
        { field: 'participant.identification', title: 'Identificación', width: '15%' },
        { field: 'course.name', title: 'Curso', width: '35%' },
    ]);

    const loadData = async () => {
        await indexData();

        numberParticipants.value = participantsWithoutRegistration.value.participantData.numberParticipants;
        numberCourses.value = participantsWithoutRegistration.value.courseData.numberCourses;
        numberRegistrations.value = participantsWithoutRegistration.value.registrationData.numberRegistrations;
        numberCertificates.value = participantsWithoutRegistration.value.certificateData.numberCertificates;

        lastParticipant.value = participantsWithoutRegistration.value.participantData.lastParticipant;
        lastCourse.value = participantsWithoutRegistration.value.courseData.lastCourse;
        lastRegistration.value = participantsWithoutRegistration.value.registrationData.lastRegistration;
        lastCertificate.value = participantsWithoutRegistration.value.certificateData.lastCertificate;

        getParticipantsWithoutRegistration();
        getCoursesWithoutRegistrations();
        getRegistrationsWithoutCertificate();
    };

    onMounted(() => {
        loadData();
    });
</script>
