<template>
    <!-- Modal View Survey -->
    <ModalViewSurvey :survey="survey" />

    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <router-link to="/apps/surveys/add" class="btn btn-primary gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="w-5 h-5"
                            >
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Agregar encuesta
                        </router-link>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Buscar..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :loading="isLoadingFetch"
                    :rows="surveys"
                    :columns="cols"
                    :totalRows="surveys?.length"
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
                            <div class="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                                <img class="h-8 w-8 rounded-full object-cover" :src="`/assets/images/profile-${data.value.id}.jpeg`" />
                            </div>
                            {{ data.value.title }}
                        </div>
                    </template>
                    <template #status="data">
                        <span class="badge" :class="[statusOptionStyle(data.value.status)]">
                            {{ data.value.status }}
                        </span>
                    </template>
                    <template #actions="data">
                        <div class="flex gap-x-2">
                            <router-link :to="{ name: 'survey-edit', params: { id: data.value.id } }">
                                <button type="button" class="btn btn-success btn-sm">
                                    <icon-edit class="w-4 h-4 mr-1" />
                                    Editar
                                </button>
                            </router-link>
                            <button type="button" class="btn btn-info btn-sm" @click="handleView(data.value)">
                                <icon-eye class="w-4 h-4 mr-1" />
                                Ver
                            </button>
                            <router-link :to="{ name: 'survey-config', params: { id: data.value.id } }">
                                <button type="button" class="btn btn-warning btn-sm">
                                    <icon-settings class="w-4 h-4 mr-1" />
                                    Configurar
                                </button>
                            </router-link>
                            <button type="button" class="btn btn-danger btn-sm" @click="handleDelete(data.value.id)">
                                <icon-trash-lines class="w-4 h-4 mr-1" />
                                Eliminar
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import { useGetSurveys } from './actions/getSurveys';
    import IconSettings from '@/components/icon/icon-settings.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import ModalViewSurvey from './ModalViewSurvey.vue';
    import { storeToRefs } from 'pinia';
    import { useSurveyStore } from './store/survey';
    import { Survey } from './types/survey';

    useMeta({ title: 'Encuestas' });

    const { getSurveys, surveys, isLoadingFetch } = useGetSurveys();
    const { survey, isSurveyModalOpen } = storeToRefs(useSurveyStore());

    const datatable: any = ref(null);
    const search = ref('');

    const cols = ref([
        { field: 'id', title: 'ID', width: '10%' },
        { field: 'title', title: 'Título', width: '50%' },
        { field: 'status', title: 'Estado', width: '10%' },
        { field: 'actions', title: 'Acciones', sort: false, headerClass: 'justify-center', width: '30%' },
    ]);

    const deleteRow = (item: any = null) => {
        if (confirm('Are you sure want to delete selected row ?')) {
            // if (item) {
            //     items.value = items.value.filter((d) => d.id != item);
            //     datatable.value.clearSelectedRows();
            // } else {
            //     let selectedRows = datatable.value.getSelectedRows();
            //     const ids = selectedRows.map((d) => {
            //         return d.id;
            //     });
            //     items.value = items.value.filter((d) => !ids.includes(d.id as never));
            //     datatable.value.clearSelectedRows();
            // }
        }
    };

    const statusOptionStyle = (status: string) => {
        switch (status) {
            case 'borrador':
                return 'badge-outline-primary';
            case 'publicado':
                return 'badge-outline-success';
            case 'cerrado':
                return 'badge-outline-danger';
        }
    };

    const handleView = (surveyView: Survey) => {
        isSurveyModalOpen.value = true;
        survey.value = surveyView;
    };

    const handleDelete = (id: number) => {
        console.log('Eliminar?');
    };

    onMounted(async () => {
        await getSurveys();
        isSurveyModalOpen.value = false;
    });
</script>
