<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <h1 class="text-xl font-semibold">Lista de inscripciones por curso</h1>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Buscar..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :loading="isLoadingFetch"
                    :rows="registrationCourseParticipants"
                    :columns="cols"
                    :totalRows="registrationCourseParticipants?.length"
                    :sortable="true"
                    :search="search"
                    paginationInfo="Mostrando {0} a {1} de {2} entradas"
                    noDataContent="No hay datos disponibles"
                    skin=""
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                    <template #id="data">
                        {{ data.value.id }}
                    </template>
                    <template #name="data">
                        <div class="flex items-center font-semibold">
                            {{ data.value.name }}
                        </div>
                    </template>
                    <template #number_participants="data">
                        <div class="flex items-center font-semibold">
                            {{ data.value.number_participants }}
                        </div>
                    </template>
                    <template #number_organizers="data">
                        <div class="flex items-center font-semibold">
                            {{ data.value.number_organizers }}
                        </div>
                    </template>
                    <template #start_date="data">
                        <div class="flex items-center font-semibold">
                            {{ extractDateFromISO(data.value.start_date) }}
                        </div>
                    </template>
                    <template #end_date="data">
                        <div class="flex items-center font-semibold">
                            {{ extractDateFromISO(data.value.end_date) }}
                        </div>
                    </template>
                    <template #actions="data">
                        <div class="flex justify-center gap-x-2">
                            <button type="button" class="btn btn-warning btn-sm" @click="handleViewRegistrationParticipants(data.value.id)">
                                <icon-eye class="w-4 h-4 mr-1" />
                                Ver
                            </button>
                            <router-link :to="{ name: 'registration-edit', params: { id: data.value.id } }">
                                <button type="button" class="btn btn-success btn-sm">
                                    <icon-edit class="w-4 h-4 mr-1" />
                                    Inscribir
                                </button>
                            </router-link>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>

        <ModalRegistrationParticipants :isOpenModal="isOpenModalRegistrationParticipants" :courseId="courseId" @closeModal="handleCloseModalRegistrationParticipants" />
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    import { useGetRegistrationCourseParticipants } from './actions/getRegistrations';
    import ModalRegistrationParticipants from './ModalRegistrationParticipants.vue';

    useMeta({ title: 'Lista de incripciones por curso' });

    const { getRegistrationCourseParticipants, registrationCourseParticipants, isLoadingFetch } = useGetRegistrationCourseParticipants();

    const datatable: any = ref(null);
    const search = ref('');

    const extractDateFromISO = (isoDate: string): string => {
        if (!isoDate) return '';
        return isoDate.split('T')[0].split('-').reverse().join('/');
    };

    const cols = ref([
        { field: 'id', title: 'ID', width: '5%' },
        { field: 'name', title: 'Nombres', width: '20%' },
        { field: 'number_participants', title: 'N° de Participantes', width: '15%' },
        { field: 'number_organizers', title: 'N° de Ponentes', width: '15%' },
        { field: 'start_date', title: 'Fecha de Inicio', width: '15%' },
        { field: 'end_date', title: 'Fecha de Término', width: '15%' },
        { field: 'actions', title: 'Acciones', sort: false, headerClass: 'justify-center', width: '15%' },
    ]);

    const isOpenModalRegistrationParticipants = ref(false);
    const courseId = ref(0);

    const handleViewRegistrationParticipants = (id: number) => {
        courseId.value = id;
        isOpenModalRegistrationParticipants.value = true;
    };

    const handleCloseModalRegistrationParticipants = () => {
        isOpenModalRegistrationParticipants.value = false;
    };
    onMounted(async () => {
        await getRegistrationCourseParticipants();
    });
</script>
