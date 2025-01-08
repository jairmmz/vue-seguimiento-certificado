<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <router-link to="/apps/certificate-templates/add" class="btn btn-primary gap-2">
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
                            Agregar Plantilla del Certificado
                        </router-link>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Buscar..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :loading="isLoadingFetch"
                    :rows="certificateTemplates"
                    :columns="cols"
                    :totalRows="certificateTemplates?.length"
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
                    <template #actions="data">
                        <div class="flex justify-center gap-x-2">
                            <button type="button" class="btn btn-warning btn-sm" @click="handleViewCertificateTemplate(data.value)">
                                <icon-eye class="w-4 h-4 mr-1" />
                                Ver
                            </button>
                            <router-link :to="{ name: 'certificate-templates-edit', params: { id: data.value.id } }">
                                <button type="button" class="btn btn-info btn-sm">
                                    <icon-edit class="w-4 h-4 mr-1" />
                                    Configurar
                                </button>
                            </router-link>
                            <router-link :to="{ name: 'certificate-templates-edit', params: { id: data.value.id } }">
                                <button type="button" class="btn btn-success btn-sm">
                                    <icon-edit class="w-4 h-4 mr-1" />
                                    Editar
                                </button>
                            </router-link>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>

        <ModalCertificateTemplateView
            :is-open-modal="showModal"
            :certificate-template-url="certificateTemplateUrl"
            :name-certificate-template="nameCertificateTemplate"
            @close-modal="handleCloseModal"
        />
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    import { useGetCertificateTemplates } from './actions/getCertificateTemplates';
    import ModalCertificateTemplateView from './ModalCertificateTemplateView.vue';
    import { CertificateTemplate } from './types/certificate-template';

    useMeta({ title: 'Plantillas de Certificado' });

    const { getCertificateTemplates, certificateTemplates, isLoadingFetch } = useGetCertificateTemplates();

    const datatable: any = ref(null);
    const search = ref('');

    const cols = ref([
        { field: 'id', title: 'ID', width: '5%' },
        { field: 'name', title: 'Nombres', width: '40%' },
        { field: 'actions', title: 'Acciones', sort: false, headerClass: 'justify-center', width: '25%' },
    ]);

    const showModal = ref(false);
    const certificateTemplateUrl = ref('');
    const nameCertificateTemplate = ref('');

    const handleViewCertificateTemplate = (data: CertificateTemplate) => {
        certificateTemplateUrl.value = data.template_file_url ?? '';
        nameCertificateTemplate.value = data.name;
        showModal.value = true;
    };

    const handleCloseModal = () => {
        showModal.value = false;
    };

    onMounted(async () => {
        await getCertificateTemplates();
    });
</script>
